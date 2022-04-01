import fetchBase from "./fetchBase0";
import CONSTANTS from "../CONSTANTS";

const spotifyArtistDetails = "spotify_artist_details";

export async function fetchArtist({ id }) {
  console.log("fetchArtist id", id);
  try {
    const artists = localStorage.getItem(spotifyArtistDetails);

    if (artists) {
      const artistsJson = JSON.parse(artists);

      if (id in artistsJson) {
        console.log("returning artistDetails from localStorage");
        return artistsJson[id];
      }
    }
  } catch (error) {
    return null;
  }

  try {
    const access_token = await fetchBase();
    const response = await fetch(
      `https://${CONSTANTS.spotifyDomain}/${CONSTANTS.spotifyVersion}/artists/${id}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    const json = await response.json();
    console.log("json", json);
    // const { artist } = json;

    // if (artist) {
    //   const artistLocalStorage = localStorage.getItem(spotifyArtistDetails);
    //   let newArtistDetails = {};

    //   if (artistLocalStorage) {
    //     const currentArtistDetails = JSON.parse(artistLocalStorage);
    //     newArtistDetails = {...currentArtistDetails};
    //   }

    //   newArtistDetails[id] = artist;

    //   localStorage.setItem(
    //     spotifyArtistDetails,
    //     JSON.stringify(newArtistDetails)
    //   );

    //   return json;
    // }

    return json;
  } catch (error) {
    return error;
  }
}

export default fetchArtist;
