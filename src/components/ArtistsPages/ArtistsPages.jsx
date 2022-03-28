import React from "react";
import ArtistPage from "./ArtistPage";

function ArtistsPages({ list, artistDetailsSetter }) {
  // console.log("list", list);

  return (
    <div>
      {list &&
        list.map((page) => (
          <ArtistPage
            key={page.href}
            page={page}
            artistDetailsSetter={artistDetailsSetter}
          />
        ))}
    </div>
  );
}

export default ArtistsPages;
