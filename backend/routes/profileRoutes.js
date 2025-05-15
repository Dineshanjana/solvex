const express = require('express');
const router = express.Router();
const { fetchLinkedInProfile } = require('../controllers/linkedinController');
const { fetchXProfile } = require('../controllers/XController');

// Routes
router.get('/fetch-profile-linkedin/:fbId', fetchLinkedInProfile);
router.get('/fetch-profile-x/:fbId', fetchXProfile);

module.exports = router;
