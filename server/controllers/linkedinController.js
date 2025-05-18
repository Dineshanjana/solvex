const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();
const FormData = require('form-data');
const https = require('https');
const crypto = require('crypto');

function stringToInt(str) {
    const buffer = Buffer.from(str, 'utf-8');
    let hex = buffer.toString('hex');
    return BigInt('0x' + hex);
}

function intToString(intVal) {
    const hex = intVal.toString(16);
    const buffer = Buffer.from(hex, 'hex');
    return buffer.toString('utf-8');
}

exports.fetchLinkedInProfile = async (req, res) => {
    const { fbId } = req.params;

    try {
        // Step 1: Get accessToken from fbAuth
        const authData = await prisma.fbAuth.findUnique({
            where: { fbId: fbId },
        });

        if (!authData || !authData.AccessToken) {
            return res.status(400).json({ error: 'AccessToken not found' });
        }

        const accessToken = authData.AccessToken;

        // Step 2: Check if profile exists in fbPage table
        const existing = await prisma.fbPage.findFirst({
            where: { authId: authData.id },
        });

        if (existing) {
            return res.json({
                success: true,
                profile: {
                    name: existing.name,
                    picture: existing.picture,
                    email: existing.email || null,
                },
            });
        }

        // Step 3: Fetch profile from LinkedIn using /userinfo
        const profileRes = await axios.get('https://api.linkedin.com/v2/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const { sub, name, picture, email } = profileRes.data;

        // Step 4: Save to database
        await prisma.fbPage.create({
            data: {
                PageId: sub,
                name,
                picture,
                email,
                AccessToken: accessToken,
                authId: authData.id,
                userId: authData.userId,
                status: true,
            },
        });

        res.json({ success: true, profile: { name, picture, email } });
    } catch (err) {
        console.error('LinkedIn error:', err.message);
        res.status(500).json({ error: 'Failed to fetch LinkedIn profile' });
    }
};


exports.createLinkedInPost = async (req, res) => {
    const { id, imageUrl, caption, hashtags } = req.body;

    try {
        const fbPage = await prisma.fbPage.findUnique({
            where: { PageId: id },
            select: { id: true, userId: true, AccessToken: true },
        });

        if (!fbPage) {
            return res.status(404).json({ error: 'LinkedIn user not found in FbPage model' });
        }

        const message = `${caption}\n\n${hashtags}`;

        const dbPost = await prisma.post.create({
            data: {
                userId: fbPage.userId,
                fbPageId: fbPage.id,
                imageUrl,
                caption,
                hashtags,
                isPosted: false,
                visibility: 'PRIVATE',
            },
        });

        const sub = id;
        let assetUrn;

        // If imageUrl exists, handle image upload
        if (imageUrl) {
            try {
                const registerResponse = await axios.post(
                    'https://api.linkedin.com/v2/assets?action=registerUpload',
                    {
                        registerUploadRequest: {
                            recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
                            owner: `urn:li:person:${sub}`,
                            serviceRelationships: [
                                {
                                    relationshipType: 'OWNER',
                                    identifier: 'urn:li:userGeneratedContent',
                                },
                            ],
                        },
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${fbPage.AccessToken}`,
                            'Content-Type': 'application/json',
                            'X-Restli-Protocol-Version': '2.0.0',
                        },
                    }
                );

                const uploadUrl = registerResponse.data.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
                assetUrn = registerResponse.data.value.asset;

                // Download and upload image
                const imageResponse = await axios.get(imageUrl, {
                    responseType: 'arraybuffer',
                });

                const imageBuffer = imageResponse.data;

                await axios.put(uploadUrl, imageBuffer, {
                    headers: {
                        Authorization: `Bearer ${fbPage.AccessToken}`,
                        'Content-Type': 'image/jpeg',
                    },
                    maxContentLength: Infinity,
                    maxBodyLength: Infinity,
                });

            } catch (err) {
                console.error('Image upload error:', err.response?.data || err.message);
                await prisma.post.delete({ where: { id: dbPost.id } });
                return res.status(500).json({ error: 'Failed to upload image to LinkedIn', details: err.response?.data || err.message });
            }
        }

        // Prepare post content
        const postContent = {
            author: `urn:li:person:${sub}`,
            lifecycleState: 'PUBLISHED',
            specificContent: {
                'com.linkedin.ugc.ShareContent': {
                    shareCommentary: {
                        text: message,
                    },
                    shareMediaCategory: imageUrl ? 'IMAGE' : 'NONE',
                    ...(imageUrl && assetUrn
                        ? {
                            media: [
                                {
                                    status: 'READY',
                                    media: assetUrn,
                                    description: { text: caption },
                                    title: { text: 'Post Image' },
                                },
                            ],
                        }
                        : {}
                    ),
                },
            },
            visibility: {
                'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
            },
        };

        // Make the post
        await axios.post('https://api.linkedin.com/v2/ugcPosts', postContent, {
            headers: {
                Authorization: `Bearer ${fbPage.AccessToken}`,
                'X-Restli-Protocol-Version': '2.0.0',
                'Content-Type': 'application/json',
            },
        });

        await prisma.post.update({
            where: { id: dbPost.id },
            data: { isPosted: true },
        });

        res.json({ success: true, platform: 'LinkedIn' });

    } catch (err) {
        console.error('General Error:', err.message);
        res.status(500).json({ error: err.message });
    }
};




