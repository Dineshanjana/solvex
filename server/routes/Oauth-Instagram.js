    const express = require("express");
const axios = require("axios");
const { route } = require("./authRoutes");
const router = express.Router();

const INSTAGRAM_CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID;
const INSTAGRAM_CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET;
const INSTAGRAM_REDIRECT_URI = process.env.INSTAGRAM_REDIRECT_URI;

// Step 1: Redirect user to Instagram's OAuth page
router.get("/connect", (req, res) => {
    const state = JSON.stringify({ userId: req.query.userId, intent: "INSTAGRAM" });

    const authUrl = new URL("https://api.instagram.com/oauth/authorize");
    authUrl.searchParams.set("client_id", INSTAGRAM_CLIENT_ID);
    authUrl.searchParams.set("redirect_uri", INSTAGRAM_REDIRECT_URI);
    authUrl.searchParams.set("scope", "user_profile,user_media"); // Read permissions
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("state", encodeURIComponent(state));

    res.redirect(authUrl.toString());
});

// Step 2: Handle callback and exchange code for access token
router.get("/callback", async (req, res) => {
    const code = req.query.code;

    if (!code) {
        return res.status(400).json({ error: "Authorization code missing" });
    }

    try {
        // Step 3: Exchange code for access token
        const tokenRes = await axios.post("https://api.instagram.com/oauth/access_token", null, {
            params: {
                client_id: INSTAGRAM_CLIENT_ID,
                client_secret: INSTAGRAM_CLIENT_SECRET,
                grant_type: "authorization_code",
                redirect_uri: INSTAGRAM_REDIRECT_URI,
                code
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        const { access_token, user_id } = tokenRes.data;

        // Step 4: Get user profile
        const userRes = await axios.get(`https://graph.instagram.com/${user_id}`, {
            params: {
                fields: "id,username,account_type,media_count",
                access_token
            }
        });

        const userProfile = userRes.data;

        res.json({
            message: "Instagram authentication successful",
            accessToken: access_token,
            profile: userProfile
        });

    } catch (error) {
        console.error("Instagram OAuth error:", error.response?.data || error.message);
        res.status(500).json({ error: "OAuth failed", detail: error.response?.data || error.message });
    }
});


router.get("/failed", (req, res) => {
    res.status(401).json({
        error: "Instagram OAuth failed",
        description: req.query.error_description || "Unknown reason"
    });
});


module.exports =router;