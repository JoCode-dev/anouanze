import React, { useEffect } from "react";
import LogContainer from "../components/Login/LogContainer";
import { useSelector } from "react-redux";
import { isEmpty } from "../components/utils";

const Login = () => {
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!isEmpty(user)) {
      window.location = "/";
    }
    {
      localStorage.clear();
    }
  }, [user]);

  return (
    <div>
      <LogContainer />
    </div>
  );
};

export default Login;
