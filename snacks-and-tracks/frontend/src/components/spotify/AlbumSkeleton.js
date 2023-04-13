const AlbumSkeleton = () => {
    return (
      <div>
          <div
            className="relative flex flex-col items-center justify-center p-4 bg-white animate-pulse"
            style={{
              width: "100%",
              paddingBottom: "25%",
              paddingTop: "25%",
              position: "relative",
            }}
          >
            <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
            <div className="w-32 h-4 mt-2 bg-gray-200 rounded-full"></div>
            <div className="w-24 h-4 mt-2 bg-gray-200 rounded-full"></div>
          </div>
      </div>
    );
  };
  
  export default AlbumSkeleton;
  