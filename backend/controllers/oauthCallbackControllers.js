const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const { getRedirectUrl, getErrorRedirectUrl } = require("../utils/redirectUtils");

const prisma = new PrismaClient();

async function handleFacebookAuth(req, res, userId) {

  const AccessToken = req.user?.accessToken || req.query.access_token;
  const profile = req.user || {};

  try {
    const FbId = profile.id;

    const existingFbAuth = await prisma.fbAuth.findUnique({
      where: { fbId: BigInt(FbId) },
    });

    if (existingFbAuth) {
      await prisma.fbAuth.update({
        where: { fbId: BigInt(FbId) },
        data: { AccessToken, isConnected: true, platform: "FACEBOOK" },
      });
    } else {
      await prisma.fbAuth.create({
        data: {
          fbId: BigInt(FbId),
          AccessToken,
          isConnected: true,
          userId: parseInt(userId),
          platform: "FACEBOOK",
        },
      });
    }

    return res.redirect(getRedirectUrl("fb", true, { token: AccessToken, id: FbId }));
  } catch (error) {
    console.error("Facebook Auth Error:", error.message);
    return res.status(500).send("Facebook authentication failed");
  }
}

async function handleInstagramAuth(req, res) {
  const state = JSON.parse(req.query.state || "{}");
  const intent = state.intent;
  const userId = state.userId;

  const AccessToken = req.user?.accessToken || req.query.access_token;
  const profile = req.user || {};

  try {
    const pagesRes = await axios.get(`https://graph.facebook.com/v18.0/me/accounts?access_token=${AccessToken}`);
    const pages = pagesRes.data.data;

    for (const page of pages) {
      const pageDetailsRes = await axios.get(`https://graph.facebook.com/v18.0/${page.id}?fields=instagram_business_account&access_token=${AccessToken}`);
      const igAccount = pageDetailsRes.data.instagram_business_account;

      if (igAccount && igAccount.id) {
        const igId = BigInt(igAccount.id);
        const existingIgAuth = await prisma.fbAuth.findUnique({ where: { fbId: igId } });

        if (existingIgAuth) {
          await prisma.fbAuth.update({
            where: { fbId: igId },
            data: { AccessToken, isConnected: true, platform: "INSTAGRAM" },
          });
        } else {
          await prisma.fbAuth.create({
            data: {
              fbId: igId,
              AccessToken,
              isConnected: true,
              userId: parseInt(userId),
              platform: "INSTAGRAM",
            },
          });
        }

        return res.redirect(getRedirectUrl("ig", true, { id: igAccount.id, token: AccessToken }));
      }
    }

    return res.redirect(getErrorRedirectUrl("no_instagram_found"));
  } catch (error) {
    console.error("Instagram Auth Error:", error.message);
    return res.status(500).send("Instagram authentication failed");
  }
}

async function handleLinkedInAuth(req, res, userId) {
  const code = req.query.code;
  let AccessToken;
  const linkedInId = Math.floor(Math.random() * 100000000000000) + 1;

  if (!code) {
    return res.redirect(`/auth/linkedin/failed?error=missing_code`);
  }

  try {
    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      null,
      {
        params: {
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.LINKEDIN_CALLBACK_URL,
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    AccessToken = tokenResponse.data.access_token;

  } catch (error) {
    console.error("LinkedIn OAuth error:", error.response?.data || error.message);
    return res.redirect(`/auth/linkedin/failed?error=oauth_failed&error_description=${encodeURIComponent(error.message)}`);
  }

  try {
    const existingLinkedIn = await prisma.fbAuth.findUnique({
      where: { fbId: BigInt(linkedInId) },
    });

    if (existingLinkedIn) {
      await prisma.fbAuth.update({
        where: { fbId: BigInt(linkedInId) },
        data: { AccessToken, isConnected: true, platform: "LINKEDIN" },
      });
    } else {
      await prisma.fbAuth.create({
        data: {
          fbId: BigInt(linkedInId),
          AccessToken,
          isConnected: true,
          userId: parseInt(userId),
          platform: "LINKEDIN",
        },
      });
    }
    return res.redirect(getRedirectUrl("li", true, { id: linkedInId, token: AccessToken }));
  } catch (error) {
    console.error("LinkedIn Auth Error:", error.message);
    return res.status(500).send("LinkedIn authentication failed");
  }
}

async function handleXState(req, res) {
  try {
    const { state, code, error } = req.query;

    // Handle OAuth errors
    if (error) {
      console.error("Twitter OAuth error:", error);
      return res.status(400).send(`Twitter authorization failed: ${error}`);
    }

    if (!state || !code) {
      return res.status(400).send("Missing required parameters");
    }

    let parsedState;
    try {
      // Properly decode the state parameter
      parsedState = JSON.parse(decodeURIComponent(state));
    } catch (parseError) {
      console.error("Failed to parse state:", parseError);
      return res.status(400).send("Invalid state parameter");
    }

    const { userId, stateData, codeVerifier, intent } = parsedState;

    if (!codeVerifier) {
      return res.status(403).send("Invalid request: missing code verifier");
    }

    // Exchange code for tokens
    const tokenResponse = await axios.post(
      "https://api.twitter.com/2/oauth2/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.TWITTER_CALLBACK_URL,
        client_id: process.env.TWITTER_CLIENT_ID,
        code_verifier: codeVerifier
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // Only include Authorization if using client credentials
          ...(process.env.TWITTER_CLIENT_SECRET && {
            Authorization: `Basic ${Buffer.from(
              `${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`
            ).toString("base64")}`
          })
        }
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Fetch user data from Twitter
    const userResponse = await axios.get("https://api.twitter.com/2/users/me", {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      params: {
        // Request additional user fields if needed
        "user.fields": "profile_image_url,name,username"
      }
    });

    const twitterUser = userResponse.data.data;
    console.log("user Data is :".twitterUser);

    return { userId, twitterId: twitterUser.id, intent, AccessToken: access_token }

  } catch (error) {
    console.error("Twitter OAuth callback error:", error.response?.data || error.message);
    res.status(500).send("Twitter authentication failed. Please try again.");
  }
}

async function handleXAuth(req, res) {

  try {

    const { userId, twitterId, intent, AccessToken } = await handleXState(req, res);

    const existingX = await prisma.fbAuth.findUnique({
      where: { fbId: BigInt(twitterId) },
    });

    if (existingX) {
      await prisma.fbAuth.update({
        where: { fbId: BigInt(twitterId) },
        data: { AccessToken, isConnected: true, platform: "X" },
      });
    } else {
      await prisma.fbAuth.create({
        data: {
          fbId: BigInt(twitterId),
          AccessToken,
          isConnected: true,
          userId: parseInt(userId),
          platform: "X",
        },
      });
    }

    return res.redirect(getRedirectUrl("tw", true, { id: twitterId, token: AccessToken }));
  } catch (error) {
    console.error("X Auth Error:", error.message);
    return res.status(500).send("X (Twitter) authentication failed");
  }
}

exports.oauthCallback = async (req, res) => {
  const { state } = req.query;
  const decoded = JSON.parse(decodeURIComponent(state));
  const { userId, intent } = decoded;

  switch (intent) {
    case "FACEBOOK":
      return handleFacebookAuth(req, res, userId);
    case "INSTAGRAM":
      return handleInstagramAuth(req, res);
    case "LINKEDIN":
      return handleLinkedInAuth(req, res, userId);
    case "X":
      return handleXAuth(req, res);
    default:
      return res.status(400).json({ message: "Unsupported platform intent" });
  }

};
