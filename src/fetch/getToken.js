const spotifyAccessToken = "spotify_access_token";

const spotifyClientId = process.env.REACT_APP_CLIENT_ID;
const spotifyClientSecret = process.env.REACT_APP_CLIENT_SECRET;

async function fetchToken(clientId, clientSecret) {
  try {
    // Authorization token
    const token = "Basic " + btoa(clientId + ":" + clientSecret);

    // Headers
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    // Body
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    // Options
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    // Url
    const getTokenUrl = "https://accounts.spotify.com/api/token";

    // Fetch
    const response = await fetch(getTokenUrl, requestOptions);
    const json = await response.json();
    const { access_token, expires_in } = json;
    const newToken = {
      access_token: access_token,
      expires_at: Date.now() + expires_in * 1000,
    };

    // Store Item
    // console.log("setting token to localStorage", newToken);
    localStorage.setItem(spotifyAccessToken, JSON.stringify(newToken));

    return newToken;
  } catch (error) {
    return {
      access_token: null,
      expires_at: null,
    };
  }
}

async function clearAndFetchToken(clientId, clientSecret) {
  // Clear Item
  localStorage.removeItem(spotifyAccessToken);

  return await fetchToken(clientId, clientSecret);
}

async function getToken() {
  // Get Storage Item
  const spotify_access_token = localStorage.getItem(spotifyAccessToken);

  // Check stored token
  if (spotify_access_token) {
    const json = JSON.parse(spotify_access_token);
    const { access_token, expires_at } = json;

    if (Number(Date.now()) < Number(expires_at)) {
      // console.log("returning access_token from localStorage");
      return access_token;
    }

    // Token exists in localStorage but is outdated
    const { access_token: accessToken } = await clearAndFetchToken(
      spotifyClientId,
      spotifyClientSecret
    );
    return accessToken;
  }

  // Fetch fresh token and store it
  const { access_token: accessToken } = await clearAndFetchToken(
    spotifyClientId,
    spotifyClientSecret
  );
  return accessToken;
}

export default getToken;
