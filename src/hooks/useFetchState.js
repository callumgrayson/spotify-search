import { useReducer } from "react";
import runFetch from "../fetch/runFetch";
import addToken from "../fetch/addToken";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

function useFetchState() {
  function fetchReducer(state, action) {
    switch (action.type) {
      case "loading":
        return { ...initialState, loading: true };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  async function trigger(urlToFetch, options) {
    if (!urlToFetch) return;

    try {
      dispatch({ type: "loading" });
      const optionsWithToken = await addToken(options);
      const result = await runFetch(urlToFetch, optionsWithToken);
      dispatch(result);
    } catch (error) {
      dispatch({ type: "error", payload: error });
    }
  }

  return [state, trigger];
}

export default useFetchState;
