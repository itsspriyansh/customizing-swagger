const express = require('express');
const statusController = require('../controllers/statusController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/status/:id', statusController.statuses_get);

router.post('/status/add', authMiddleware.checkUser, statusController.statuses_post);

module.exports = router;