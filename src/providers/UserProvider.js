import React, { useEffect } from "react";
import { Client } from "../apis/APIs";

export const UserDispatcherContext = React.createContext(null);
export const UserContext = React.createContext({
  auth: null,
  token: "",
});

const UserProvider = ({ children }) => {
  const [state, setState] = React.useState({
    auth: null,
    token: "",
  });

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        Client.defaults.headers.common["Authorization"] = token;
        setState((prev) => ({ ...prev, token, auth: true }));
      } else {
        setState((prev) => ({ ...prev, token: "", auth: false }));
      }
    } catch (error) {}
  }, []);

  return (
    <UserContext.Provider value={state}>
      <UserDispatcherContext.Provider value={setState}>
        {children}
      </UserDispatcherContext.Provider>
    </UserContext.Provider>
  );
};

export { UserProvider };
