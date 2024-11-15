import { useState } from "react";
import App from "./App";
import { userContex } from "./contex/UserContex";

const AppWraper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  return (
    <userContex.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      <App />
    </userContex.Provider>
  );
};

export default AppWraper;
