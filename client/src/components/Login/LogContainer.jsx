import React, { useState } from "react";
import { NavLink } from "react-router-dom";

// Sign In Form
import SignInForm from "./Forms/SignInForm";

// Sign Up Form
import SignUpForm from "./Forms/SignUpForm";

const LogContainer = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignIn = () => {
    setIsSignIn(true);
    setIsSignUp(false);
  };

  const handleSignUp = () => {
    setIsSignIn(false);
    setIsSignUp(true);
  };

  return (
    <div className="Log-container">
      <div className="log-logo-container">
        <NavLink to="/">
          <img src={process.env.PUBLIC_URL + "/imgs/icon.webp"} alt="logo-anouanze" />
        </NavLink>
      </div>
      <div className="test">
        {isSignIn && <SignInForm />}
        {isSignUp && <SignUpForm />}
      </div>

      <div className="switch-log">
        {isSignIn && (
          <div>
            Pas encore inscrit?&nbsp;
            <p onClick={handleSignUp}>Inscrivez vous</p>
          </div>
        )}

        {isSignUp && (
          <div>
            Déjà inscrit?&nbsp;<p onClick={handleSignIn}>Connectez vous</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogContainer;
