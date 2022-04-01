import React from "react";

function GenresList({ genresList, handleSetGenre, selectedGenre }) {
  return (
    <div className="genres-list">
      <div className="spacer">
        {genresList &&
          genresList.map((genre) => (
            <div key={genre}>
              <button
                onClick={() => handleSetGenre(genre)}
                className={[
                  "option-button",
                  selectedGenre === genre ? "selected" : "",
                ].join(" ")}
              >
                {selectedGenre === genre ? (
                  <span className="indicator">&#129078;</span>
                ) : null}
                {genre}
              </button>
              <span></span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default GenresList;
