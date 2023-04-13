import { useEffect, useState } from "react";

const useTimeLeft = (expirationDuration) => {
  const [timeLeft, setTimeLeft] = useState(expirationDuration);

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    const currentTime = new Date().getTime();

    if (expirationTime && currentTime < expirationTime) {
      const intervalId = setInterval(() => {
        const timeLeft = expirationTime - new Date().getTime();
        setTimeLeft(timeLeft > 0 ? timeLeft : 0);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setTimeLeft(0);
    }
  }, [expirationDuration]);

  return timeLeft;
};

export default useTimeLeft;