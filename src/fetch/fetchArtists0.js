import fetchBase from "./fetchBase0";
import CONSTANTS from "../CONSTANTS";

const spotifyArtistsList = "spotify_artists_list";

export async function fetchArtists({ genre }) {
  console.log("genre", genre);
  // try {
  //   const artists = localStorage.getItem(spotifyArtistsList);

  //   if (artists) {
  //     console.log("returning artists from localStorage");
  //     return JSON.parse(artists);
  //   }
  // } catch (error) {
  //   return null;
  // }

  try {
    const tokenObject = await fetchBase();
    console.log("tokenObject", tokenObject);
    const response = await fetch(
      `https://${CONSTANTS.spotifyDomain}/${CONSTANTS.spotifyVersion}/search?type=artist&q=genre:${genre}`,
      {
        headers: {
          Authorization: "Bearer " + tokenObject.access_token,
        },
      }
    );

    const json = await response.json();
    console.log("fetchArtists json", json);
    const { artists } = json;

    if (artists) {
      localStorage.setItem(spotifyArtistsList, JSON.stringify(artists));

      return artists;
    }

    return [];
  } catch (error) {
    return error;
  }
}

export default fetchArtists;
