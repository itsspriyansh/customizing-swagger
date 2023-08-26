const express = require('express');
const quicktypeController = require('../controllers/quicktypeController');

const router = express.Router();

router.post('/get-types', quicktypeController.types_post);

module.exports = router;