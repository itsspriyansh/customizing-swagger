const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');

const router = express.Router();

router.get('/get-user', authMiddleware.checkUser, authController.user_get);
router.get('/logout', authController.logout_get);

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);

module.exports = router;