import { useEffect, useState } from "react";
import { useSpotifyId } from "../hooks/useSpotifyId";
// import { useEdamam } from "../hooks/useEdamam";

import RecommendedGrid from "../components/spotify/RecommendedGrid";
import SpotifyLogin from "../components/spotify/SpotifyLogin";

const Recommended = () => {
  // const { edamam } = useEdamam('Peaceful');
  const { spotifyid, hasSpotify } = useSpotifyId();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await spotifyid();
      setLoading(false);
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       await edamam();
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <div>
      {!loading && !hasSpotify && <SpotifyLogin />}
      {!loading && hasSpotify && <RecommendedGrid />}
    </div>
  );
};

export default Recommended;
