import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
      if (err) {
        res.redirect("/login");
      } else next();
    });
  } else {
    res.redirect("/login");
  }
};

export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, result) => {
      if (err) {
        res.locals.user = null;
      } else {
        let user = await UserModel.find(result.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
