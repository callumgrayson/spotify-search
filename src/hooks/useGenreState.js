import { useEffect, useState } from "react";
import useFetch from "./useFetch";
import getToken from "../fetch/getToken";
import CONSTANTS from "../CONSTANTS";

function useGenreState() {
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

  const url = `https://${CONSTANTS.spotifyDomain}/${CONSTANTS.spotifyVersion}/${CONSTANTS.spotifyPathGenres}`;
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { data, error } = useFetch(token ? url : null, options);

  const loading = !data && !error ? true : false;

  return [{ data, error, loading }];
}

export default useGenreState;
