const express = require('express');
const { getImages, deleteImage } = require('../controllers/imageController');

const router = express.Router();

router.get('/', getImages);
router.delete('/', deleteImage);

module.exports = router;