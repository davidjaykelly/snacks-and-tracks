const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_SECRET, { expiresIn: "1d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create token
    const token = createToken(user._id);

    res.status(200).json({ email: email, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.register(name, email, password);

    // create token
    const token = createToken(user._id);

    res.status(200).json({ email: email, token: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get current user
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).populate(
      "spotify",
      "spotifyId"
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// get spotify id
const getSpotifyId = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).populate(
      "spotify",
      "spotifyId"
    );
    
    res.status(200).json(user.spotify._id);
  } catch (error) {
    res.status(500).send("Spotify not linked");
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUser,
  getSpotifyId
};
