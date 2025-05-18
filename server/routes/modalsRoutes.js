const express = require("express");
const router = express.Router();
const {PostGen}  = require("../controllers/modalsController");

router.post("/post-gen", PostGen);

module.exports = router;