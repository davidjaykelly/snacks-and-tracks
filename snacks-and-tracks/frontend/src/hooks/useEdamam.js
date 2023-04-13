import { useAuthContext } from "./useAuthContext";

export const useEdamam = (search) => {
  const { user } = useAuthContext();
  const searchText = search;

  const edamam = async () => {

    const response = await fetch(`/api/edamam/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchText }),
    });
    const data = await response.json();
    console.log(data)
  };
  return { edamam };
};
