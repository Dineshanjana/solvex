const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();

exports.fetchLinkedInProfile = async (req, res) => {
    const { fbId } = req.params;

    try {
        // Step 1: Get accessToken from fbAuth
        const authData = await prisma.fbAuth.findUnique({
            where: { fbId: BigInt(fbId) },
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
