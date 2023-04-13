const { Album } = require('../models/albumModel');

const album = async (req, res) => {
  try {
    const artist = req.params.artist;
    const albumName = req.params.album;

    console.log(artist, albumName)

    const albumObject = await Album.findOne({ artistStr: artist, nameStr: albumName });

    console.log(albumObject);

    if (!albumObject) {
      res.status(404).send('Album not found');
      return;
    }

    res.send(albumObject);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

module.exports = {
    album
}