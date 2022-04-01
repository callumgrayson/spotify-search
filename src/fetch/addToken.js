import getToken from "./getToken";

async function addToken(optionsObject = {}) {
  const token = await getToken();
  const newOptions = {
    headers: {},
    ...optionsObject,
  };
  if (token) {
    newOptions.headers.Authorization = "Bearer " + token;
  }
  return newOptions;
}

export default addToken;
