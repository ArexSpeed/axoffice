import React, { createContext, useReducer} from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ reducer, initialState, children }) => (
  <GlobalContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </GlobalContext.Provider>
);
