const express = require('express');
const router = express.Router();
const { fetchLinkedInProfile, createLinkedInPost } = require('../controllers/linkedinController');
const { fetchXProfile, createXPost } = require('../controllers/XController');


// Routes
router.get('/fetch-profile-linkedin/:fbId', fetchLinkedInProfile);
router.get('/fetch-profile-x/:fbId', fetchXProfile);
router.post('/create-post-linkedin', createLinkedInPost);
router.post('/create-post-x',createXPost);

module.exports = router;
