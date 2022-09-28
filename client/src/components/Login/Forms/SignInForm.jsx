import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/auth";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const SignInForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(userData, false));
  };

  const googleSuccess = async (res) => {
    const decoded = jwtDecode(res.credential);
    const googleUser = {
      email: decoded?.email,
      password: decoded?.sub,
      confirmPassword: decoded?.sub,
      name: decoded?.given_name,
      lastName: decoded?.family_name,
    };

    setUserData({ ...userData, email: decoded?.email, password: decoded?.sub });

    const bool = true;
    dispatch(login(googleUser, bool));
  };
  const googleFailure = (error) => {
    console.log("====================================");
    console.log(error);
    console.log("====================================");

    console.log("Google Sign In was unsuccessful. Try Again later.");
  };

  return (
    <div className="sign-in-container">
      <div className="header-container">
        <h1>Heureux de vous revoir !</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem quas
          maiores nisi.
        </p>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="inputs-group">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            required
            name="email"
            id="email"
            className="input-form"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
        </div>
        <div className="inputs-group">
          <label htmlFor="password">Mot de Passe</label>
          <br />
          <input
            type="password"
            required
            name="password"
            id="password"
            className="input-form"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <div className="inputs-group">
          <input type="submit" value="Connexion" />
        </div>
        <div>
          <p className="error">{message}</p>
        </div>

        <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />
      </form>
    </div>
  );
};

export default SignInForm;
