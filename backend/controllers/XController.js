const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();

exports.fetchXProfile = async (req, res) => {
    const { fbId } = req.params;

    try {
        const authData = await prisma.fbAuth.findUnique({
            where: { fbId: BigInt(fbId) },
        });

        if (!authData || !authData.AccessToken) {
            return res.status(404).json({ error: 'AccessToken not found' });
        }

        const accessToken = authData.AccessToken;

        // Check if profile already exists in fbPage
        const existing = await prisma.fbPage.findFirst({
            where: {
                authId: authData.id
            },
        });

        if (existing) {
            // Return existing data from db
            return res.json({
                success: true,
                profile: {
                    id: existing.PageId,
                    name: existing.name,
                    username: existing.username || null,
                    picture: existing.picture,
                },
            });
        }

        // If not in DB, fetch from Twitter API
        const profileRes = await axios.get("https://api.twitter.com/2/users/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                "user.fields": "profile_image_url,id,name,username,verified",
            },
        });

        const { id, name, username, profile_image_url } = profileRes.data.data;

        // Save to db
        await prisma.fbPage.create({
            data: {
                PageId: id,
                name,
                username,
                picture: profile_image_url,
                AccessToken: accessToken,
                authId: authData.id,
                userId: authData.userId,
                username: username,
                status: true,
            },
        });

        res.json({
            success: true,
            profile: { id, name, username, picture: profile_image_url },
        });

    } catch (err) {
        console.error('Twitter error:', err.message);
        res.status(500).json({ error: 'Failed to fetch Twitter profile' });
    }
};
