const spotifyAccessToken = "spotify_access_token";

async function fetchToken(clientId, clientSecret) {
  try {
    const token = "Basic " + btoa(clientId + ":" + clientSecret);
    // console.log("token", token);
    const getTokenUrl = "https://accounts.spotify.com/api/token";
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const response = await fetch(getTokenUrl, requestOptions);
    const json = await response.json();
    console.log("json from fetch: ", json);
    const { access_token, expires_in } = json;

    const newToken = {
      access_token: access_token,
      expires_at: Date.now() + expires_in,
    };

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
  localStorage.removeItem(spotifyAccessToken);
  return await fetchToken(clientId, clientSecret);
}

async function getToken(clientId, clientSecret) {
  const spotify_access_token = localStorage.getItem(spotifyAccessToken);

  if (spotify_access_token) {
    const json = JSON.parse(spotify_access_token);

    // console.log("json", json);
    const { expires_at } = json;
    // console.log("expires_at, access_token", expires_at, access_token);
    console.log("Date.now()", Date.now());
    console.log("expires_at", expires_at);
    if (Number(Date.now()) < Number(expires_at)) {
      console.log("returning access_token from localStorage");
      return json;
    }

    // Token exists in localStorage but is outdated
    return await clearAndFetchToken(clientId, clientSecret);
  }
  return await clearAndFetchToken(clientId, clientSecret);
}

export default getToken;
