const getArtistInfo = async (artistName) => {
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${process.env.LASTFM_API_KEY}&format=json`)
    const results = await response.json();
    return(results);
}

module.exports = {
    getArtistInfo,
} 