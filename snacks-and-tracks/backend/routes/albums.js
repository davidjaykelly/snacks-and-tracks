const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

const { album } = require('../controllers/albumController');

router.get('/:artist/:album', requireAuth, album);

module.exports = router;
