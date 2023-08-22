const express = require('express');
const statusController = require('../controllers/statusController');

const router = express.Router();

router.get('/status/:id', statusController.statuses_get);

module.exports = router;