const SpotifyWebApi = require("spotify-web-api-node");
const ColorThief = require("colorthief");
const { textColor, rgbToHex } = require("./colorUtils");
const { getMood, createAlbumMood } = require("./audioUtils");

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-read-recently-played",
  "playlist-modify-public",
  "playlist-modify-private",
];

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

const getAlbumsData = async (albumIds) => {
  const albumPromises = albumIds.map(async (albumId) => {
    const albumData = await spotifyApi.getAlbum(albumId);
    const album = albumData.body;
    const trackIds = album.tracks.items.map((track) => track.id);
    const img = album.images[1].url;
    const colour = await ColorThief.getColor(img);
    const hex = rgbToHex(colour);
    const textColorHex = textColor(hex); 
    album.hex = hex;
    album.textColor = textColorHex;
    album.trackIds = trackIds;
    album.artistStr = album.artists[0].name.replace(/ /g, "-").toLowerCase();
    album.albumStr = album.name.replace(/ /g, "-").toLowerCase();
    album.labelStr = album.label.replace(/ /g, "-").toLowerCase();
    return { album: album };
  });

  const albumsData = await Promise.all(albumPromises);
  const albums = albumsData.map((data) => data.album);
  return albums;
};

const getRecommendations = async (artistArray) => {
  const data = await spotifyApi.getRecommendations({
    seed_artists: artistArray,
    min_popularity: 50,
    limit: 20,
  });
  const recommendations = data.body;
  const tracks = recommendations.tracks;
  const albumIds = tracks.map((track) => track.album.id);
  const albums = await getAlbumsData(albumIds);
  return { albums };
};

const getUserTopArtists = async () => {
  const data = await spotifyApi.getMyTopArtists({ limit: 5 });
  const artists = data.body.items;
  const artistArray = artists.map((artist) => artist.id);
  return artistArray;
};

const getAlbumMoods = async (trackIds) => {
  const albumAnalysis = await spotifyApi.getAudioFeaturesForTracks(trackIds);
  const trackMoods = getMood(albumAnalysis.body.audio_features);
  const albumMood = createAlbumMood(trackMoods);
  return albumMood;
};

module.exports = {
  scopes,
  spotifyApi,
  getAlbumsData,
  getRecommendations,
  getUserTopArtists,
  getAlbumMoods,
};