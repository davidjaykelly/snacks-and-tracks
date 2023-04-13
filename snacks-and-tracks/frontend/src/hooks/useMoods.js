import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useMoods = () => {
  const { user } = useAuthContext();
  const [albumMoods, setAlbumMoods] = useState({});

  const getTrackMoods = async (albumId, trackIds) => {
    try {
      const response = await fetch("/api/spotify/trackmoods", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ albumId, trackIds }),
      });
      const data = await response.json();
      setAlbumMoods((prevMoods) => ({
        ...prevMoods,
        [albumId]: data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return { albumMoods, getTrackMoods };
};
