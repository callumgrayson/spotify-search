import { useEffect, useState } from "react";
import CONSTANTS from "../CONSTANTS";
import useFetchState from "../hooks/useFetchState";

function useArtistsState() {
  const [artistsLists, setArtistsLists] = useState({});
  const [fetchState, triggerFetch] = useFetchState();

  useEffect(() => {
    // handle newly fetched artists
    try {
      const newPage = fetchState?.data?.artists;

      if (newPage) {
        const search = newPage.href.split("?")[1];
        const urlParams = new URLSearchParams(search);
        const query = urlParams.get("query");
        const urlGenre = query.split(":")[1];
        if (!urlGenre) return;

        if (!artistsLists[urlGenre]) {
          artistsLists[urlGenre] = [];
        }

        let newListForGenre = [];

        if (Array.isArray(artistsLists[urlGenre])) {
          newListForGenre = [...artistsLists[urlGenre]];
        }

        const currentHrefs = artistsLists[urlGenre].map((item) => item.href);

        // check href is not already in the list
        if (currentHrefs.includes(newPage.href)) return;

        // add if new
        newListForGenre.push(newPage);

        const newArtistsLists = {
          ...artistsLists,
          [urlGenre]: newListForGenre,
        };

        setArtistsLists(newArtistsLists);
      }
    } catch (error) {
      console.log("error adding newly fetched artists", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchState]);

  function triggerArtists(genre) {
    // If this function is called it is...
    // a) because genre has changed
    // b) because another page is needed

    try {
      if (!(genre in artistsLists)) {
        // fetch for this genre
        try {
          let url = `https://${CONSTANTS.spotifyDomain}/${CONSTANTS.spotifyVersion}/search?type=artist&q=genre:${genre}`;
          triggerFetch(url);
        } catch (error) {
          console.log("error - initial fetch in triggerArtists", error);
        }
      } else {
        // fetch the next page for this genre
        // by finding the next property on the last array for that genre
        try {
          const pagesArray = artistsLists[genre];
          const len = pagesArray.length;
          const last = pagesArray[len - 1];
          const nextUrl = last.next;
          triggerFetch(nextUrl);
        } catch (error) {
          console.log(
            "error in retrieving and fetching next artist list",
            error
          );
        }
      }
    } catch (error) {
      console.log("error - triggerArtists", error);
    }
  }

  return [
    {
      data: artistsLists,
      error: fetchState.error,
      loading: fetchState.loading,
    },
    triggerArtists,
  ];
}

export default useArtistsState;
