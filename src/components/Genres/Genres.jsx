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

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
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
