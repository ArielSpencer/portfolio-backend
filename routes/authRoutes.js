const express = require('express');
const nextAuthHandler = require('../controllers/authController');

const router = express.Router();

router.use(nextAuthHandler);

module.exports = router;