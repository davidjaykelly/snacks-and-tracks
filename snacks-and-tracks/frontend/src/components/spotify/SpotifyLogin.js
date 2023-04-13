import { useSpotify } from "../../hooks/useSpotify";
import spotifyLogo from "../../images/spotify-logo.png";

const SpotifyLogin = () => {
  const { spotify } = useSpotify();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await spotify();
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 bg-white rounded-lg">
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center px-4 py-2 font-bold text-white bg-green-500 rounded spotify-connect-button hover:bg-green-600"
        >
          <img src={spotifyLogo} alt="Spotify Logo" className="h-16 mx-auto invert" />
        </button>
      </div>
    </div>
  );
};

export default SpotifyLogin;