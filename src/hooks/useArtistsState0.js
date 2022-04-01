import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import getToken from "../fetch/getToken";
import CONSTANTS from "../CONSTANTS";

function useArtistsState() {
  const [genre, setGenre] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    async function run() {
      const accessToken = await getToken();
      if (accessToken) {
        setToken(accessToken);
      }
    }

    run();
  }, []);

  console.log("hook: genre", genre);

  const url =
    token && genre
      ? `https://${CONSTANTS.spotifyDomain}/${CONSTANTS.spotifyVersion}/search?type=artist&q=genre:${genre}`
      : null;
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  console.log("url", url);
  const { data, error, loading } = useFetch(url, options);
  console.log("data, error, loading", data, error, loading);

  return [{ data, error, loading }, setGenre];
}

export default useArtistsState;
