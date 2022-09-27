import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/auth";
import { GoogleLogin } from "react-google-login";

const SignInForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  const GOOGLE_CLIENT_ID = "";
  const googleSuccess = (res) => {
    console.log("====================================");
    console.log(res);
    console.log("====================================");
  };
  const googleFailure = () => {
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

        {/* <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          render={(renderProps) => (
            <button
              className="google-button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <p>Se connecter avec Google</p>
              <div>
                <img
                  src={process.env.PUBLIC_URL + "/imgs/google-logo.png"}
                  alt="Google"
                />
              </div>
            </button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        /> */}
      </form>
    </div>
  );
};

export default SignInForm;
