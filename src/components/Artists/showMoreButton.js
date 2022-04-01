function showMoreButton(inObject) {
  try {
    const len = inObject.length;
    const lastItem = inObject[len - 1];

    if (lastItem.next) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

export default showMoreButton;
