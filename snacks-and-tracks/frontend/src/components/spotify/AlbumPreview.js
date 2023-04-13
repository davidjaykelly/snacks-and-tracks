// import { useMoods } from "../../hooks/useMoods";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AlbumPreview = ({ album }) => {
  // const { albumMoods, getTrackMoods } = useMoods();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       await getTrackMoods(album.id, album.trackIds);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  // }, [album]);

  return (
    <div
      key={album.id}
      className="relative flex flex-col items-center justify-center p-4 bg-white album"
      style={{
        width: "100%",
        paddingBottom: "100%",
        position: "relative",
      }}
      id={album.id}
    >
      <img
        src={album.images[0].url}
        alt={album.name}
        className="absolute inset-0 z-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 z-10 duration-300 bg-black bg-opacity-25 album-overlay">
        <div
          className="overlay"
          style={{ backgroundColor: `${album.hex}`, height: "100%" }}
        >
          <div className="absolute album-wrapper bottom-5">
            <Link to={`/albums/${album.artistStr}/${album.albumStr}`}>
              <h1
                className="px-4 py-2 text-lg font-medium"
                style={{ color: `${album.textColor}` }}
              >
                {album.name}
              </h1>
            </Link>
            <p className="px-4 py-1" style={{ color: `${album.textColor}` }}>
              {album.artists[0].name}
            </p>
            <p className="px-4 py-1" style={{ color: `${album.textColor}` }}>
              {album.release_date}
            </p>
            {/* {loading ? (
              <div className="relative flex flex-col justify-center px-4 py-1 items-left animate-pulse">
                <div
                  className="w-24 h-4 rounded-full"
                  style={{ backgroundColor: `${album.textColor}` }}
                ></div>
              </div>
            ) : (
              <div>
                {albumMoods[album.id] && (
                  <p className="px-4 py-1" style={{ color: `${album.textColor}` }}>
                    {albumMoods[album.id].albummood}
                  </p>
                )}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPreview;
