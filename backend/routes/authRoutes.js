const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.post('/signup', auth.signup);
router.post('/verify-otp', auth.verifyOtp);
router.post('/login', auth.login);

module.exports = router;
