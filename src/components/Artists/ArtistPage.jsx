import React from "react";
import Artist from "../ArtistsPages/Artist";

function ArtistPage({ page, artistDetailsSetter, artistDetails }) {
  if (page && page.items && page.items.length === 0) {
    return (
      <div>
        <p>There are no artists to show in this genre.</p>
      </div>
    );
  }

  return (
    <div>
      {page &&
        page.items.map((artist) => (
          <Artist
            key={artist.id}
            artist={artist}
            artistDetailsSetter={artistDetailsSetter}
            artistDetails={artistDetails}
          />
        ))}
    </div>
  );
}

export default ArtistPage;
