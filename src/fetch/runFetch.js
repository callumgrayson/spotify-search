async function runFetch(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `code: ${response.status}, statusText: ${response.statusText}`
      );
    }

    const data = await response.json();

    return { type: "fetched", payload: data };
  } catch (error) {
    return { type: "error", payload: error.message };
  }
}

export default runFetch;

// Typical Response object:
// const resp = {
//   body: {}, // Readable Stream
//   bodyUsed: true,
//   headers: {}, // Headers Object
//   ok: true,
//   redirected: false,
//   status: 200,
//   statusText: "",
//   type: "cors",
//   url: "https://api.spotify.com/v1/search?type=artist&q=genre:rock",
// };
