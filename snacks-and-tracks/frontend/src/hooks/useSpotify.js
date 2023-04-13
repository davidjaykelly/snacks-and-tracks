import { useAuthContext } from "./useAuthContext";

export const useSpotify = () => {
  const { user } = useAuthContext();

  const spotify = async () => {

    fetch(`/api/spotify/login?token=${user.token}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.text())
      .then((authorizeUrl) => {
        window.location = authorizeUrl;
      });

  };
  return { spotify };
};
