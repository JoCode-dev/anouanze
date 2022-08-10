import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge });
};

export const signup = async (req, res) => {
  const user = req.body;

  const newUser = new UserModel(user);
  try {
    const existingUser = await UserModel.findOne({ email: user.email });

    if (existingUser) {
      return res.status(400).json({ message: "Cet utilisateur existe déjà" });
    } else {
      if (user.password !== user.confirmPassword)
        return res
          .status(404)
          .json({ message: "Les mots de passes ne correspondent pas" });

      await newUser.save();
      const token = createToken(newUser._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge });
      res.status(201).json({ result: newUser, token });
    }
  } catch (error) {
    res.status(401).send(error);
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      return res.status(400).json({ message: "L'utilisateur n'existe pas" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Erreur d'email ou de mot de passe" });
    }

    const token = createToken(existingUser._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const logout = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, maxAge: 1 });
  res.redirect("/");
  res.statusCode = 200;
  //res.status(200).json({ message: "Logout successfully" });
};
