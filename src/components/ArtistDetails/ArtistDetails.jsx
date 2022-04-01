import React from "react";
import SectionHeading from "../Headings/SectionHeading";

function ArtistDetails({ artist }) {
  if (!artist)
    return (
      <div>
        <p>Select an artist to see details</p>
      </div>
    );

  return (
    <div>
      <h4>{artist.name}</h4>
      <p>Followers {Number(artist.followers.total).toLocaleString()}</p>
      <p>Popularity {Number(artist.popularity)} / 100</p>
      <img src={artist.images[2].url} alt={`Artist: ${artist.name}`} />
      <p>
        <a href={artist.external_urls.spotify} target="_blank" rel="noreferrer">
          Visit in Spotify
        </a>
      </p>
    </div>
  );
}

function ArtistsDetailsStyled(C) {
  return function (props) {
    return (
      <div className="section-container artists-details-container">
        <SectionHeading text={"Artist Details"} />
        <C {...props} />
      </div>
    );
  };
}
export default ArtistsDetailsStyled(ArtistDetails);
