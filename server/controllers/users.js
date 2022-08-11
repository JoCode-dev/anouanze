import UserModel from "../models/UserModel.js";
import mongoose from "mongoose";

// CRUD
// CREATE USER
// THE USER IS CREATED BY SIGNUP //

// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// GET ONE USER BY ID
export const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(500).json({ message: `Invalid ${id}` });

  try {
    const user = await UserModel.findById(id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(500).json({ message: `Invalid ${id}` });

  const { name, lastName, contact, email } = req.body;

  const updatedUser = { name, lastName, contact, email, _id: id };

  try {
    await UserModel.findByIdAndUpdate(id, updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    return res.status(500).json({ message: `Invalid ${id}` });

  try {
    await UserModel.findByIdAndRemove(id);
    res.status(200).json({ message: `Successfully removed ${id}` });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
