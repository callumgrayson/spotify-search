import { useReducer } from "react";
import runFetch from "../fetch/runFetch";
import addToken from "../fetch/addToken";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

function useFetchState() {
  // What does a fetch state hook need to do?
  // Hold state for loading, data, error
  // reducer can take actions and payloads and manage the state
  // needs an initiator to run a fetch and add it to the data
  // call it fetcher or doFetch

  // function rather than hook, then it can be called conditionally
  // handle caching, for now, in the specific hook,
  // call fetcher to get data only: takes a url and options and adds the token and handles the error states
  // always returns something predictable
  // can be called in any hook

  // perhaps the useFetchState hook could work?
  // it would be set on mount of component and then last as long as the component
  // it could lie at the top level of a specific hook and would be called by its handler
  // use the handler anywhere and pass in a new url and options, if applicable
  // the hook would still call a fetcher function which adds the token before fetch

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

// async function pause(ms) {
//   return new Promise((res) => {
//     setTimeout(() => {
//       res(true);
//     }, ms);
//   });
// }
