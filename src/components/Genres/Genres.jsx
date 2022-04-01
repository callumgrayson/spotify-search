import GenresList from "./GenresList";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import useGenreState from "../../hooks/useGenreState";
import SectionHeading from "../Headings/SectionHeading";

function Genres({ genre, setGenre }) {
  const [{ loading, error, data }] = useGenreState();

  function handleGenreChange(newGenre) {
    setGenre(newGenre);
  }

  // Loading
  if (loading) return <Loading />;
  // Error
  if (error) return <Error error={error} />;
  // Data
  if (data)
    return (
      <GenresList
        genresList={data.genres}
        handleSetGenre={handleGenreChange}
        selectedGenre={genre}
      />
    );
  // Default
  return null;
}

function GenresStyled(C) {
  return function (props) {
    return (
      <div className="section-container genres-container">
        <SectionHeading text="Genres" />
        <C {...props} />
      </div>
    );
  };
}

export default GenresStyled(Genres);
