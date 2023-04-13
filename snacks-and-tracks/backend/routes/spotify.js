const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();


// import controllers
const { loginUser, callback, recommended, getTrackMoods } = require('../controllers/spotifyController');

// register route
router.get('/callback', callback);

// login route
router.post('/login', requireAuth, loginUser);

// recommended route
router.get('/recommended', requireAuth, recommended)

// get track moods
router.post('/trackmoods', requireAuth, getTrackMoods);

module.exports = router;