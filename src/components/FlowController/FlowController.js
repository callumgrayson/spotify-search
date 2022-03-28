import { useEffect, useState } from "react";
import fetchBase from "../../fetch/fetchBase";
import fetchGenres from "../../fetch/fetchGenres";
import fetchArtists from "../../fetch/fetchArtists";
import ArtistsPages from "../ArtistsPages/ArtistsPages";
import GenresList from "../Genres/GenresList";
import ArtistDetails from "../ArtistsPages/ArtistDetails";

function FlowController() {
  const [token, setToken] = useState("");
  const [genre, setGenre] = useState("");
  const [genresList, setGenresList] = useState([]);
  const [artistsPages, setArtistsPages] = useState({});
  const [artistDetails, setArtistDetails] = useState(null);

  async function getToken() {
    const access_token = await fetchBase();
    setToken(access_token);
  }

  async function getGenres() {
    const genresList = await fetchGenres();
    setGenresList(genresList);
  }

  function handleSetGenre(genre) {
    if (genre) {
      setGenre(genre);
    }
  }

  function artistDetailsSetter(artist) {
    if (artist) {
      setArtistDetails(artist);
    }
  }

  useEffect(() => {
    async function getArtists() {
      const artists20 = await fetchArtists({ genre });
      console.log("artists20", artists20);
      setArtistsPages((pages) => {
        return {
          ...pages,
          [genre]: pages[genre] ? [...pages[genre], artists20] : [artists20],
        };
      });
    }

    if (genre) {
      if (!(genre in artistsPages)) {
        const newArtistsPages = {
          ...artistsPages,
          [genre]: [],
        };
        setArtistsPages(newArtistsPages);
        getArtists();
      }
    }
  }, [genre]);

  //   console.log("artistDetails", artistDetails);

  return (
    <div>
      {/* <button onClick={getToken}>GetToken</button>
      <h4>Token</h4>
      <p>{token?.access_token}</p>
      <p>
        {token?.expires_at} -{" "}
        {token?.expires_at ? new Date(token.expires_at).toISOString() : null}
      </p> */}

      <div className="options-container">
        <div className="genres-container">
          <h4>Genres</h4>
          <button onClick={getGenres}>Get Genres</button>
          <GenresList
            genresList={genresList}
            handleSetGenre={handleSetGenre}
            selectedGenre={genre}
          />
        </div>
        <div className="artists-container">
          <h4>Artists</h4>
          <h4>Artists for {genre} genre</h4>
          <ArtistsPages
            list={artistsPages[genre]}
            artistDetailsSetter={artistDetailsSetter}
          />
        </div>
        <div className="artists-details-container">
          <h4>Artist Details</h4>
          {/* <pre>{JSON.stringify(artistDetails)}</pre> */}
          <ArtistDetails artist={artistDetails} />
        </div>
      </div>
    </div>
  );
}

export default FlowController;
