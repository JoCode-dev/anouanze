import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../actions/auth";

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
      </form>
    </div>
  );
};

export default SignInForm;
