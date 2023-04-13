const jwt = require("jsonwebtoken");
const sanitizeHtml = require('sanitize-html');
const { User } = require("../models/userModel");
const { Album } = require("../models/albumModel");
const {
  spotifyApi,
  scopes,
  getAlbumsData,
  getUserTopArtists,
  getAlbumMoods,
} = require("../utils/spotifyUtils");
const { getArtistInfo } = require("../utils/lastUtils");

// spotify login user
const loginUser = async (req, res) => {
  const { token } = req.query;

  var html = spotifyApi.createAuthorizeURL(scopes, token);
  res.send(html + "&show_dialog=true");
};

// spotify callback
const callback = async (req, res) => {
  const { code, state } = req.query;
  const token = state;

  try {
    const { _id } = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ _id }).select("_id");
    const data = await spotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token, expires_in } = data.body;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    const userProfile = await spotifyApi.getMe();
    const spotifyUserId = userProfile.body.id;

    // Update Spotify schema for user
    await user.updateSpotifySchema(access_token, refresh_token, spotifyUserId);

    res.redirect(`/`);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const getTrackMoods = async (req, res) => {
  const albumId = req.body.albumId;
  const trackIds = req.body.trackIds;

  try {
    const albumMood = await getAlbumMoods(trackIds);
    res.json({ albumid: albumId, albummood: albumMood });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// spotify recommended
const recommended = async (req, res) => {
  const user = await User.findById({ _id: req.user._id }).populate("spotify");

  spotifyApi.setRefreshToken(user.spotify.refreshToken);
  try {
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body["access_token"]);

    const artistArray = await getUserTopArtists();
    const data2 = await spotifyApi.getRecommendations({
      seed_artists: artistArray,
      min_popularity: 50,
      limit: 20,
    });
    const recommendations = data2.body;
    const tracks = recommendations.tracks;
    const albumIds = tracks.map((track) => track.album.id);
    const albums = await getAlbumsData(albumIds);

    const albumsArray = [];
    for (const album of albums) {
      // check if album already exists in database
      const albumExists = await Album.findOne({ albumID: album.id });
      if (!albumExists) {
        artist = album.artists[0].name;
        artistStr = artist.replace(/ /g, "-").toLowerCase();
        name = album.name;
        nameStr = name.replace(/ /g, "-").toLowerCase();
        label = album.label;
        labelStr = label.replace(/ /g, "-").toLowerCase();

        try {
          const artistInfo = await getArtistInfo(artist);
          const artistBio = artistInfo.artist.bio.summary;
          const artistBio2 = artistBio.replaceAll('\n','<br>');
          const artistBio3 = sanitizeHtml(artistBio2, {
            allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'br' ],
            allowedAttributes: {
              'a': [ 'href' ]
            }
          });
          
          const artistBioClean = artistBio3.replaceAll('<a href','... <a class="text-blue-600 no-underline hover:underline" href');

          const newAlbum = new Album({
            albumID: album.id,
            artist: artist,
            artistStr: artistStr,
            name: name,
            nameStr: nameStr,
            hex: album.hex,
            textColor: album.textColor,
            imageURL: album.images[0].url,
            label: label,
            labelStr: labelStr,
            releaseDate: album.release_date,
            trackIds: album.trackIds,
            type: album.type,
            artistBio: artistBioClean,
          });
          await newAlbum.save();
        } catch (error) {
          console.error(error);
        }
      }

      // check if album already exists in user's album array
      const userAlbum = user.albums.includes(album.id);
      if (!userAlbum) {
        albumsArray.push(album.id);
      }
    }

    await user.saveAlbums(albumsArray);

    res.json({ albums: albums });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = {
  loginUser,
  callback,
  recommended,
  getTrackMoods,
};
