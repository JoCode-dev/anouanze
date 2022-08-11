import React, { useState, useEffect } from "react";
import LogContainer from "../components/Login/LogContainer";

const Login = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("jwt")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("jwt")));

    if (user) {
      window.location = "/";
    }
  }, [user]);

  return (
    <div>
      <LogContainer />
    </div>
  );
};

export default Login;
