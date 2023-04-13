import { useState, useEffect } from "react";

const Timer = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const EXPIRATION_DURATION = 1 * 60 * 1000;

  useEffect(() => {
    const ALBUMS_KEY = "albums";
    const albumsData = localStorage.getItem(ALBUMS_KEY);
    if (!albumsData) return;

    const timestamp = JSON.parse(albumsData).timestamp;
    const expirationTime = timestamp + EXPIRATION_DURATION;
    const remainingTime = expirationTime - new Date().getTime();

    if (remainingTime > 0) {
      setRemainingTime(remainingTime);
    }
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const percentageRemaining = (remainingTime / EXPIRATION_DURATION) * 100;
  const progressBarStyles = {
    width: `${percentageRemaining}%`,
    height: "20px",
    backgroundColor: "gray",
    borderRadius: "5px",
    transition: "width 0.5s ease-in-out" // Add a CSS transition
  };

  return (
    <div>
        <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full" style={progressBarStyles}></div>
    </div>
  )
};

export default Timer;
