import { useState } from "react";
import Genres from "../Genres/Genres";
import Artists from "../Artists/Artists";
import ArtistDetails from "../ArtistDetails/ArtistDetails";

function FlowController() {
  const [genre, setGenre] = useState("");
  const [artistDetails, setArtistDetails] = useState(null);

  return (
    <div className="options-container">
      <Genres genre={genre} setGenre={setGenre} />
      <Artists
        setArtistDetails={setArtistDetails}
        artistDetails={artistDetails}
        genre={genre}
      />
      <ArtistDetails artist={artistDetails} />
    </div>
  );
}

export default FlowController;
