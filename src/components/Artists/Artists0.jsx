import { useEffect, useState } from "react";
import ArtistPage from "./ArtistPage";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import useArtistsState from "../../hooks/useArtistsState";

function Artists({ setArtistDetails, genre }) {
  const [pages, setPages] = useState(null);
  const [{ loading, data, error }, setterArtists] = useArtistsState();
  // useEffect(() => {
  //   async function getArtists() {
  //     const artists20 = await fetchArtists({ genre });
  //     console.log("artists20", artists20);
  //     setArtistsPages((pages) => {
  //       return {
  //         ...pages,
  //         [genre]: pages[genre] ? [...pages[genre], artists20] : [artists20],
  //       };
  //     });
  //   }

  //   if (genre) {
  //     if (!(genre in artistsPages)) {
  //       const newArtistsPages = {
  //         ...artistsPages,
  //         [genre]: [],
  //       };
  //       setArtistsPages(newArtistsPages);
  //       getArtists();
  //     }
  //   }
  // }, [genre]);

  useEffect(() => {
    // listen to pages and update

    if (data) {
      console.log("setting pages with data:", data);
      setPages([data?.artists]);
    }
  }, [data]);

  useEffect(() => {
    console.log("genre", genre);
    setterArtists(genre);
  }, [genre, setterArtists]);

  console.log("data", data);

  // Loading
  if (loading) return <Loading />;
  // Error
  if (error) return <Error error={error} />;
  // Data
  if (pages)
    return (
      <div>
        {pages.map((page) => (
          <ArtistPage
            key={page.href}
            page={page}
            artistDetailsSetter={setArtistDetails}
          />
        ))}
      </div>
    );
  // Default
  return null;
}

function ArtistsStyled(C) {
  return function (props) {
    return (
      <div className="artists-container">
        <C {...props} />
      </div>
    );
  };
}
export default ArtistsStyled(Artists);
