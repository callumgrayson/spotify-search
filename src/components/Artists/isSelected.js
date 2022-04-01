function isSelected(artistDetails, artist) {
  try {
    return artistDetails.name === artist.name;
  } catch (error) {
    return false;
  }
}

export default isSelected;
