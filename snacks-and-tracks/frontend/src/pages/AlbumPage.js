import { useState, useEffect } from "react";
import { useAlbum } from "../hooks/useAlbum";

const AlbumPage = () => {
  const { albumData, getAlbum } = useAlbum();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        await getAlbum();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  if (!albumData) {
    return <div>Loading...</div>;
  }

  const bio = albumData.artistBio;

  return (
    <div className="mx-auto md:py-10 md:px-10" style={{ maxWidth: "1200px" }}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="">
          <div
            key={albumData.albumID}
            className="relative flex flex-col items-center justify-center p-4 md:mr-5"
            style={{
              width: "100%",
              paddingBottom: "100%",
              position: "relative",
            }}
            id={albumData.albumID}
          >
            <img
              src={albumData.imageURL}
              alt={albumData.name}
              className="absolute inset-0 z-0 object-cover w-full h-full"
            />
          </div>
          <div dangerouslySetInnerHTML={{ __html:  bio }} />
        </div>
        <div className="sm:px-5 md:px-0 md:ml-5">
          <h2 className="mb-1 text-xl underline">{albumData.artist}</h2>
          <h1 className="mb-8 text-3xl font-bold">{albumData.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
