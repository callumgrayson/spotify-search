import fetchBase from "../fetch/fetchBase";
import CONSTANTS from "../CONSTANTS";

const spotifyGenresList = "spotify_genres_list";

export async function fetchGenres() {
  try {
    const genres = localStorage.getItem(spotifyGenresList);

    if (genres) {
      console.log("returning genres from localStorage");
      return JSON.parse(genres);
    }
  } catch (error) {
    return null;
  }

  try {
    const tokenObject = await fetchBase();
    const response = await fetch(
      `https://${CONSTANTS.spotifyDomain}/${CONSTANTS.spotifyVersion}/${CONSTANTS.spotifyPathGenres}`,
      {
        headers: {
          Authorization: "Bearer " + tokenObject.access_token,
        },
      }
    );

    const json = await response.json();
    console.log("fetchGenres json", json);
    const { genres } = json;

    localStorage.setItem(spotifyGenresList, JSON.stringify(genres));

    return genres;
  } catch (error) {
    return error;
  }
}

export default fetchGenres;
