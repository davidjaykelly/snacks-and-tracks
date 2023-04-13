const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let albumSchema = new Schema(
  {
    albumID: {
      type: String,
      required: true,
      unique: true,
    },
    artist: {
      type: String,
      required: true,
    },
    artistStr: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nameStr: {
      type: String,
      required: true,
    },
    hex: {
      type: String,
      required: true,
    },
    textColor: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    labelStr: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    trackIDs: {
      type: [String],
      required: true,
    },
    type: {
      type: String,
      enum: ["single", "album", "compilation"],
      required: true,
    },
    artistBio: {
      type: String,
      required: false,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = {
  Album: mongoose.model("Album", albumSchema),
};