const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const { oauthCallback } = require("../controllers/oauthCallbackControllers");
const {logout} = require("../controllers/authfacebookController");
const router = express.Router();
/**
 * Base64URL encode a Buffer or string
 * @param {Buffer|string} buffer - The data to encode
 * @returns {string} The base64URL encoded string
 */
function base64URLEncode(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
/**
 * Generate a random code verifier for PKCE
 * @returns {string} A random code verifier
 */
function generateCodeVerifier() {
  return base64URLEncode(crypto.randomBytes(32));
}
/**
 * Generate a code challenge from the code verifier
 * @param {string} codeVerifier - The code verifier
 * @returns {string} The code challenge
 */
function generateCodeChallenge(codeVerifier) {
  const hash = crypto.createHash("sha256").update(codeVerifier).digest();
  return base64URLEncode(hash);
}


router.get("/connect", (req, res) => {
  try {
    const userId = req.query.userId || req.session?.userId;

    if (!userId) {
      return res.status(400).send("Missing userId parameter");
    }

    // Generate PKCE values
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    const state = {
      userId,
      codeVerifier,
      intent: "X"
    }
    // Serialize and encode state for URL
    const encodedState = encodeURIComponent(JSON.stringify(state));

    // Build authorization URL
    const params = new URLSearchParams({
      response_type: "code",
      client_id: process.env.TWITTER_CLIENT_ID,
      redirect_uri: process.env.TWITTER_CALLBACK_URL,
      scope: [
        "tweet.read",
        "tweet.write",
        "users.read",
        "follows.read",
        "follows.write",
        "offline.access"
      ].join(" "),
      state: encodedState,
      code_challenge: codeChallenge,
      code_challenge_method: "S256"
    });

    const authUrl = `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
    res.redirect(authUrl);
  } catch (error) {
    console.error("Error initiating OAuth flow:", error);
    res.status(500).send("Failed to initiate Twitter login");
  }
});
router.get("/callback", oauthCallback);
router.post("/logout", logout);



module.exports = router;