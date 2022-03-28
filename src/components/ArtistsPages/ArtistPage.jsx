import React from "react";
import Artist from "./Artist";

function ArtistPage({ page, artistDetailsSetter }) {
  return (
    <div>
      {page &&
        page.items.map((artist) => (
          <Artist
            key={artist.id}
            artist={artist}
            artistDetailsSetter={artistDetailsSetter}
          />
        ))}
    </div>
  );
}

export default ArtistPage;
