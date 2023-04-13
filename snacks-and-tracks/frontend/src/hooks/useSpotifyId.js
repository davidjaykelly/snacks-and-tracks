import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSpotifyId = () => {
  const { user } = useAuthContext();
  const [hasSpotify, setHasSpotify] = useState(null);

  const spotifyid = async () => {
    setHasSpotify(false);

    const response = await fetch("/api/user/spotifyid", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (!response.ok) {
      setHasSpotify(false)
    } 
    if (response.ok) {
      setHasSpotify(true)
    } 
  };

  return { spotifyid, hasSpotify };
};
