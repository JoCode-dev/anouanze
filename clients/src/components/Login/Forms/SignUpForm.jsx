import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { signup } from "../../../actions/auth";

const SignUpForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(userData));
    console.log(userData);
  };

  return (
    <div className="sign-up-container">
      <div className="header-container">
        <h1>Bienvenue dans l'aventure</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem quas
          maiores nisi.
        </p>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="inputs-group">
          <label htmlFor="name">Prénoms</label>
          <br />
          <input
            type="text"
            required
            name="name"
            className="input-form"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </div>
        <div className="inputs-group">
          <label htmlFor="lastName">Nom</label>
          <br />
          <input
            type="text"
            required
            name="lastName"
            className="input-form"
            value={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          />
        </div>
        <div className="inputs-group">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            required
            name="email"
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
            minLength={6}
            name="password"
            className="input-form"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
        </div>
        <div className="inputs-group">
          <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
          <br />
          <input
            type="password"
            required
            minLength={6}
            name="confirmPassword"
            className="input-form"
            value={userData.confirmPassword}
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
          />
        </div>
        <div className="inputs-group">
          <input type="submit" value="Inscription" />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
