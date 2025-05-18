const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();

exports.fetchXProfile = async (req, res) => {
    const { fbId } = req.params;

    try {
        const authData = await prisma.fbAuth.findUnique({
            where: { fbId: fbId },
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

exports.createXPost = async (req, res) => {

  const { id, imageUrl, caption, hashtags } = req.body;

  try {
    const fbPage = await prisma.fbPage.findUnique({
      where: { PageId: id }, 
      select: { id: true, userId: true, AccessToken: true },
    });

    console.log(fbPage.AccessToken)
    if (!fbPage) {
      return res.status(404).json({ error: 'X user not found in FbPage model' });
    }

    const message = `${caption}\n\n${hashtags}\n${imageUrl}`;

    // 1. Create post in DB
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

    try {
      // 2. Post tweet
      const tweetUrl = `https://api.twitter.com/2/tweets`;

      const tweetBody = {
        text: message,
      };

      await axios.post(tweetUrl, tweetBody, {
        headers: {
          Authorization: `Bearer ${fbPage.AccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      // 3. Update DB post as posted
      await prisma.post.update({
        where: { id: dbPost.id },
        data: { isPosted: true },
      });

      res.json({ success: true, platform: 'X' });
    } catch (xError) {
      await prisma.post.delete({ where: { id: dbPost.id } });
      return res.status(500).json({ error: xError.response?.data || xError.message });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
};
