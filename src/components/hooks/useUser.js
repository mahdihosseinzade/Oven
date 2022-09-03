import { useContext } from "react";
import { Client } from "../../apis/APIs";
import {
  UserContext,
  UserDispatcherContext,
} from "../../providers/UserProvider";

const useUser = () => {
  const user = useContext(UserContext);
  const setUser = useContext(UserDispatcherContext);

  const login = (data) => {
    Client.defaults.headers.common["Authorization"] = data.token;
    localStorage.setItem("token", data?.token);
    setUser({ token: data.token, auth: true });
  };

  const logout = () => {
    delete Client.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");

    setUser({ token: "", auth: false });
  };
  return { user, login, logout };
};

export { useUser };
