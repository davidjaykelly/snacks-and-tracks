import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useAlbum = () => {
  const { artist, album } = useParams();
  const { user } = useAuthContext();
  const [albumData, setAlbumData] = useState(null);

  const getAlbum = async () => {
    try {
      const response = await fetch(`/api/albums/${artist}/${album}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });


      if (!response.ok) {
        throw new Error("Failed to fetch album data");
      }

      const albumData = await response.json();
      console.log(albumData);
      setAlbumData(albumData);

    } catch (error) {
      console.error(error);
    }
  };

  return { albumData, getAlbum };
};
