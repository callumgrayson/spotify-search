// import { useState } from "react";
import ArtistDetails from "./ArtistDetails";
import isSelected from "./isSelected";

function Artist({ artist, artistDetailsSetter, artistDetails }) {
  // const [details, setDetails] = useState(null);
  // const [showArtistDetails, setShowArtistDetails] = useState(false);

  if (artist?.name) {
    return (
      <div>
        <button
          onClick={() => artistDetailsSetter(artist)}
          className={[
            "option-button",
            isSelected(artistDetails, artist) ? "selected" : "",
          ].join(" ")}
        >
          {isSelected(artistDetails, artist) ? (
            <span className="indicator">&#129078;</span>
          ) : null}
          {artist.name}
        </button>
      </div>
    );
  }

  return null;
}

export default Artist;
