import { useRecommended } from "../../hooks/useRecommended";
// import { useMoods } from "../../hooks/useMoods";
import { useEffect, useState } from "react";
import AlbumPreview from "./AlbumPreview";
import AlbumSkeleton from "./AlbumSkeleton";

const RecommendedGrid = () => {
  const { getRecommended } = useRecommended();
  // const { albumMoods, getTrackMoods } = useMoods();
  const [loading, setLoading] = useState(true);
  // const [moodLoading, setMoodLoading] = useState(true);
  const [albums, setAlbums] = useState(true)
  
  
  useEffect(() => {
    const ALBUMS_KEY = "albums";
    const EXPIRATION_DURATION = 1 * 60 * 60 * 1000; // 1 minute in milliseconds
    const albumsData = localStorage.getItem(ALBUMS_KEY);

    async function fetchData() {
      if (albumsData) {
        const { albums, timestamp } = JSON.parse(albumsData);
        if (new Date().getTime() - timestamp < EXPIRATION_DURATION ) {
          console.log('using cached data');
          console.log(albums);
          setAlbums(albums);
          setLoading(false);
        } else {
          try {
            const albums = await getRecommended();
            setAlbums(albums);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        try {
          const albums = await getRecommended();
          setAlbums(albums);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     for (let i = 0; i < albums.length; i++) {
  //       await getTrackMoods(albums[i].id, albums[i].trackIds);
  //     }
  //     setMoodLoading(false);
  //   })();
  // }, [albums]);

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <AlbumSkeleton key={index} />
          ))}
        </div>
      ) : albums ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {albums.map((album) => (
            <AlbumPreview
              key={album.id}
              album={album}
              // albumMoods={albumMoods}
              // moodLoading={moodLoading}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4 transition-shadow bg-white rounded-lg shadow-md animate-pulse" style={{ aspectRatio: "1 / 1", width: "50vw" }}>
          <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
          <div className="w-32 h-4 mt-2 bg-gray-200 rounded-full"></div>
          <div className="w-24 h-4 mt-2 bg-gray-200 rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default RecommendedGrid;