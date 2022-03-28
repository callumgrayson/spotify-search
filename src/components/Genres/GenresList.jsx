import React from "react";

function GenresList({ genresList, handleSetGenre, selectedGenre }) {
  return (
    <div
      style={{
        display: "flex",
        // flexWrap: "wrap",
        flexDirection: "column",
        height: "80vh",
        overflowX: "auto",
      }}
    >
      {genresList &&
        genresList.map((genre) => (
          <div key={genre}>
            <button
              onClick={() => handleSetGenre(genre)}
              style={{
                backgroundColor: selectedGenre === genre ? "green" : "initial",
              }}
            >
              {genre}
            </button>
          </div>
        ))}
    </div>
  );
}

export default GenresList;
