// import { useState } from "react";
import ArtistDetails from "./ArtistDetails";

function Artist({ artist, artistDetailsSetter }) {
  // const [details, setDetails] = useState(null);
  // const [showArtistDetails, setShowArtistDetails] = useState(false);
  return (
    <div>
      <div>
        <span>{artist.id}</span>
        <span> - </span>
        <button onClick={() => artistDetailsSetter(artist)}>
          {artist.name}
        </button>
        {/* {showArtistDetails ? (
          <ArtistDetails
            artist={artist}
            details={details}
            setDetails={setDetails}
          />
        ) : null} */}
      </div>
    </div>
  );
}

export default Artist;
