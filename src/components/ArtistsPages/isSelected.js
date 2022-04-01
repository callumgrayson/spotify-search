function isSelected(artistDetails, artist) {
  try {
    return artistDetails.name === artist.name;
  } catch (error) {
    // console.log("error - isSelected", error);
    return false;
  }
}

export default isSelected;
