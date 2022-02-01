import React, { useContext, useEffect, useReducer } from "react";
import App from "./App";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";
const initialState = {
  isLoading: true,
  hits: [],
  page: 0,
  nbPages: 0,
  query: "react",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "HANDLE_SUBMIT":
        return { ...state, query: action.payload, page: 0 };
      case "SET_LOADING":
        return { ...state, isLoading: action.payload };
      case "SET_NEWS":
        return {
          ...state,
          isLoading: false,
          hits: action.payload.hits,
          nbPages: action.payload.nbPages,
        };
      case "REMOVE_STORY":
        return {
          ...state,
          hits: state.hits.filter((story) => story.objectID !== action.payload),
        };
      case "HANDLE_PAGE":
        if (action.payload === "inc") {
          let nextPage = state.page + 1;
          if (nextPage > state.nbPages - 1) {
            nextPage = 0;
          }
          return { ...state, page: nextPage };
        }
        if (action.payload === "dec") {
          let prevPage = state.page - 1;
          if (prevPage < 0) {
            prevPage = state.nbPages - 1;
          }
          return { ...state, page: prevPage };
        }
    }
  };

  const removeStory = (id) => {
    dispatch({ type: "REMOVE_STORY", payload: id });
  };

  const handlePage = (value) => {
    dispatch({ type: "HANDLE_PAGE", payload: value });
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    dispatch({ type: "SET_LOADING", payload: true });
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    dispatch({
      type: "SET_NEWS",
      payload: { hits: data.hits, nbPages: data.nbPages },
    });
  };

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.query, state.page]);

  return (
    <AppContext.Provider
      value={{ ...state, reducer, dispatch, removeStory, handlePage }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
