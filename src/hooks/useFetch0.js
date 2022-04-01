import { useRef, useState } from "react";
import fetchBase from "../fetch/fetchBase0";
import CONSTANTS from "../CONSTANTS";

const states = {
  IDLE: "idle",
  FETCHING: "fetching",
  SUCCESS: "success",
  ERROR: "error",
};

const staleDuration = CONSTANTS.staleDuration;

const defaultFetchData = {
  status: states.IDLE,
  data: null,
  error: null,
  staleFrom: Date.now(),
};

const fetchResponseJson = {
  data: null,
  error: null,
};

async function urlFetch({ url }) {
  try {
    const access_token = await fetchBase();

    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(json));
    }

    return {
      ...fetchResponseJson,
      data: json,
    };
  } catch (error) {
    return {
      ...fetchResponseJson,
      error: error,
    };
  }
}

function useFetch() {
  const cache = useRef({});
  const [fetchData, setFetchData] = useState(defaultFetchData);

  async function fetchHandler(url) {
    if (!url || !(typeof url === "string")) return;

    if (url in cache.current) {
      const cacheData = cache.current[url];

      if (cacheData.staleFrom > Date.now()) {
        setFetchData(cacheData);
        return;
      }
    }

    try {
      setFetchData({
        ...fetchData,
        status: states.FETCHING,
      });

      const latestData = await urlFetch({ url });
      cache.current[url] = latestData;
      setFetchData({
        ...fetchData,
        status: states.SUCCESS,
        data: latestData,
        staleFrom: Date.now() + staleDuration,
        error: null,
      });
    } catch (error) {
      setFetchData({
        ...fetchData,
        status: states.ERROR,
        data: null,
        staleFrom: Date.now(),
        error: error,
      });
    }
  }

  return [fetchData, fetchHandler];
}

export default useFetch;
