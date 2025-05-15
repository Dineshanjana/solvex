const express = require("express");
const passport = require("passport");
const router = express.Router();
const { oauthCallback } = require("../controllers/oauthCallbackControllers");
const { logout } = require("../controllers/authfacebookController");
const { getProfile, createPost, getPosts, getPages, facebookProfile,togglePageStatus } = require("../controllers/facebookController");
const { fetchActivePage } = require("../controllers/fbController");
const { fetchPageInsights } = require("../controllers/fbAnalytics");

router.get("/connect", (req, res, next) => {
  const userId = req.query.userId;
  const intent = req.query.intent || "FACEBOOK";

  const state = {
    userId,
    intent,
  }
  const encodedState = encodeURIComponent(JSON.stringify(state));
  passport.authenticate("facebook", {
    scope: ["email", "pages_show_list", "pages_manage_posts", "instagram_basic", "pages_manage_metadata", ],
    state: encodedState,
  })(req, res, next);

});

router.get("/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  oauthCallback
);

router.post("/logout", logout);
router.get("/profile", getProfile);
router.get("/get-pages", getPages)
router.get("/get-profile", facebookProfile);
router.post("/create-post", createPost);
router.get("/posts", getPosts);
router.post("/toggle-page-status", togglePageStatus);
router.get("/fetch-active-pages", fetchActivePage);
router.get("/fetch-analytics", fetchPageInsights);

module.exports = router;
