import mongoose from "mongoose";
import DemandeModel from "../models/DemandeModel.js";

export const addDemande = async (req, res) => {
  const { name, number, textDemand, dayMesse, dayHour, _idParoisse } = req.body;
  var ObjectId = mongoose.Types.ObjectId(_idParoisse);
  if (!mongoose.isValidObjectId(ObjectId)) {
    return res.status(500).send(`Invalid id provided`);
  }

  const newDemande = new DemandeModel({
    name,
    number,
    textDemand,
    dayMesse,
    dayHour,
    _idParoisse,
  });

  try {
    await newDemande.save();
    res.status(201).json(newDemande);
  } catch (error) {
    res.status(401).send(error);
  }
};

export const updateDemande = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(500).send(`Invalid id provided`);
  }

  const updatedDemand = { isValid: true };

  try {
    await DemandeModel.findByIdAndUpdate(id, updatedDemand);
    res.status(200).json(updatedDemand);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getDemandsByParoisse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(500).send(`Invalid id provided`);
  }

  try {
    const demands = await DemandeModel.find({
      _idParoisse: id,
    });
    res.status(200).json(demands);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getDemand = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(500).send(`Invalid id provided`);
  }
  try {
    const demande = await DemandeModel.findById(id);
    res.status(200).json(demande);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
