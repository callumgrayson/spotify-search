import { useEffect } from "react";
import useFetchState from "../hooks/useFetchState";
import CONSTANTS from "../CONSTANTS";

function useGenreState() {
  const [fetchState, triggerFetch] = useFetchState();

  useEffect(() => {
    function run() {
      try {
        const url = `https://${CONSTANTS.spotifyDomain}/${CONSTANTS.spotifyVersion}/${CONSTANTS.spotifyPathGenres}`;
        triggerFetch(url);
      } catch (error) {
        console.log("error - initial fetch in triggerArtists", error);
      }
    }

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [fetchState];
}

export default useGenreState;
