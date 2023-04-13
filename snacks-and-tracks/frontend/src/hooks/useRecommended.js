import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const ALBUMS_KEY = 'albums';

export const useRecommended = () => {
  const { user } = useAuthContext();
  const [albums, setAlbums,] = useState([]);

  const getRecommended = async () => {
    try {
        const response = await fetch("/api/spotify/recommended", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
        });
        const data = await response.json();
        const timestamp = new Date().getTime();

        localStorage.setItem(ALBUMS_KEY, JSON.stringify({ albums: data.albums, timestamp }));

        return(data.albums);   
    } catch(error) {
        console.log(error);
    }

  };

  return { getRecommended };
};