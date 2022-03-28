import CONSTANTS from "./CONSTANTS";

const { spotifyPathArtistInfo } = CONSTANTS;

const helpers = {
  artistInfoPath: (id) => `${spotifyPathArtistInfo}/${id}`,
  queryArtistPerGenre: (genre) => `type=artist&q=genre:${genre}`,
};

export default helpers;
