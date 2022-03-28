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

  return (
    <div>
      <pre>{JSON.stringify(artist, null, 2)}</pre>
    </div>
  );
}

export default ArtistDetails;
