import { useEffect } from "react";
import ArtistPage from "./ArtistPage";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import useArtistsState from "../../hooks/useArtistsState";
import SectionHeading from "../Headings/SectionHeading";
import showMoreButton from "./showMoreButton";

function Artists({ setArtistDetails, artistDetails, genre }) {
  const [{ loading, data, error }, setterArtists] = useArtistsState();

  useEffect(() => {
    setterArtists(genre);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre]);

  function fetchMore() {
    setterArtists(genre);
  }

  if (loading && !data[genre]) return <Loading />;
  if (error) return <Error error={error} />;
  if (data && data[genre])
    return (
      <div className="artists-list">
        {data[genre].map((page) => (
          <ArtistPage
            key={page.href}
            page={page}
            artistDetailsSetter={setArtistDetails}
            artistDetails={artistDetails}
          />
        ))}
        {showMoreButton(data[genre]) ? (
          <button className="more-button" onClick={fetchMore}>
            More
            <span className="entity">&#129083;</span>
          </button>
        ) : null}
      </div>
    );

  // Default
  return (
    <div>
      <p>Select a genre to see artists</p>
    </div>
  );
}

function ArtistsStyled(C) {
  return function (props) {
    return (
      <div className="section-container artists-container">
        <SectionHeading text={"Artists"} />
        <C {...props} />
      </div>
    );
  };
}
export default ArtistsStyled(Artists);
