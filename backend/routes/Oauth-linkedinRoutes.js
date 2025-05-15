const express = require("express");
const axios = require("axios");
const router = express.Router();
const { oauthCallback } = require("../controllers/oauthCallbackControllers");
const {logout} = require("../controllers/authfacebookController");


// Step 1: Redirect user to LinkedIn login
router.get("/connect", (req, res) => {
    const state = JSON.stringify({ userId: req.query.userId, intent: "LINKEDIN" });

    const encodeData = encodeURIComponent(state);
    const params = new URLSearchParams({
        response_type: "code",
        client_id: process.env.LINKEDIN_CLIENT_ID,
        redirect_uri: process.env.LINKEDIN_CALLBACK_URL,
        scope: [
            "openid",
            "profile",
            "w_member_social",
            "email",
        ].join(" "),
        state: encodeData
    });

    const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;

    res.redirect(authorizationUrl);
});

// Step 2: Handle LinkedIn callback
router.get("/callback", oauthCallback);
router.get("/failed", (req, res) => {
    res.status(401).json({
        error: req.query.error || "Authentication failed",
        message: req.query.error_description || "Unknown reason"
    });
});
router.post("/logout", logout);

module.exports = router;
