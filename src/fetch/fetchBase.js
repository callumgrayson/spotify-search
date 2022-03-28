import getToken from "./getToken";

export async function fetchBase() {
  try {
    // console.log("process.env", process.env);
    const id = process.env.REACT_APP_CLIENT_ID;
    const secret = process.env.REACT_APP_CLIENT_SECRET;
    // console.log("id", id);
    // console.log("secret", secret);
    const token = await getToken(id, secret);
    // console.log("token", token);

    return token;
  } catch (error) {
    return error;
  }
}

export default fetchBase;
