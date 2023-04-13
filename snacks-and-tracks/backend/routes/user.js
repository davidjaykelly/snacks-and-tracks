const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

// import controllers
const { registerUser, loginUser, getUser, getSpotifyId } = require('../controllers/userController');

// login route
router.post('/login', loginUser);

// register route
router.post('/register', registerUser);

//get current user
router.get('/me', requireAuth, getUser);

//get spotify id of current user
router.get('/spotifyid', requireAuth, getSpotifyId);

module.exports = router;