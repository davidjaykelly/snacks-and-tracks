const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

const { search } = require('../controllers/edamamController');

// search recipes
router.post('/search', requireAuth, search);

module.exports = router;