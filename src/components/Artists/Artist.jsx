import isSelected from "./isSelected";

function Artist({ artist, artistDetailsSetter, artistDetails }) {
  if (artist?.name) {
    return (
      <div>
        <button
          onClick={() => artistDetailsSetter(artist)}
          className={[
            "option-button",
            isSelected(artistDetails, artist) ? "selected" : "",
          ].join(" ")}
        >
          {isSelected(artistDetails, artist) ? (
            <span className="indicator">&#129078;</span>
          ) : null}
          {artist.name}
        </button>
      </div>
    );
  }

  return null;
}

export default Artist;
