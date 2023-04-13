const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

// Define Spotify schema
let spotifySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  spotifyUserId: {
    type: String,
    required: true,
  },
});

// Define User schema
let userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    spotify: {
      type: Schema.Types.ObjectId,
      ref: "Spotify"
    },
    albums: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// static register method
userSchema.statics.register = async function (name, email, password) {
  // validation
  if (!name || !email || !password) {
    throw new Error("Please fill all fields");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const userExists = await this.findOne({ email });

  if (userExists) {
    throw new Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hash,
    spotify: null
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw new Error("Please fill all fields");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("User does not exist");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Incorrect password");
  }

  return user;
};

// method to update spotify schema for a user
userSchema.methods.updateSpotifySchema = async function (
  accessToken,
  refreshToken,
  spotifyUserId
) {
  const Spotify = mongoose.model("Spotify");
  let spotify = await Spotify.findOne({ userId: this._id });

  if (!spotify) {
    spotify = new Spotify({
      userId: this._id,
      accessToken,
      refreshToken,
      spotifyUserId,
    });
  } else {
    console.log("Already linked");
    spotify.accessToken = accessToken;
    spotify.refreshToken = refreshToken;
    spotify.spotifyUserId = spotifyUserId;
  }

  await spotify.save();

  this.spotify = spotify._id;
  await this.save();
};

userSchema.methods.saveAlbums = async function (albumIds) {
  try {
    // Loop through the albumIds and add the albumId to the user's albums array
    for (let i = 0; i < albumIds.length; i++) {
      this.albums.push(albumIds[i]);
    }
    await this.save();
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  User: mongoose.model("User", userSchema),
  Spotify: mongoose.model("Spotify", spotifySchema),
};