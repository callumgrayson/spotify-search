// import { useEffect } from "react";
// import fetchArtist from "../../fetch/fetchArtist";

function ArtistDetails({ artist, details, setDetails }) {
  //   useEffect(() => {
  //     async function fetchData() {
  //       console.log("fetching artist", artist.id, artist.name);

  //       const newDetails = await fetchArtist({ id: artist.id });
  //       console.log("newDetails", newDetails);
  //       setDetails(newDetails);
  //     }

  //     console.log("details", details);
  //     if (!details) {
  //       fetchData();
  //     }
  //   }, [artist, details, setDetails]);
  if (!artist) return null;

  return (
    <div>
      <h4>{artist.name}</h4>
      <p>Followers {artist.followers.total}</p>
      <p>Popularity {artist.popularity}</p>
      <img src={artist.images[2].url} alt={`Artist: ${artist.name}`} />
      <a href={artist.external_urls.spotify} target="_blank" rel="noreferrer">
        Visit in Spotify
      </a>
      {/* <pre>{JSON.stringify(artist, null, 2)}</pre> */}
    </div>
  );
}

export default ArtistDetails;
