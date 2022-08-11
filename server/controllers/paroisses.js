import ParoisseModel from "../models/ParoisseModel.js";
import UserModel from "../models/UserModel.js";
import mongoose from "mongoose";

import fs from "fs";
import { promisify } from "util";
import stream from "stream";
const pipeline = promisify(stream.pipeline);

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CREATE
export const createParoisse = async (req, res) => {
  const paroisse = req.body;

  let fileName;
  let filesNames = [];

  if (req.files !== null) {
    try {
      req.files.map(async (file) => {
        if (
          file.detectedMimeType !== "image/jpeg" &&
          file.detectedMimeType !== "image/png" &&
          file.detectedMimeType !== "image/jpg"
        ) {
          throw Error("Invalid file");
        }

        // if (file.size > 1000000) throw Error("Max size exceeded");

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        fileName = req.body.name + uniqueSuffix + ".jpg";
        let trimName = "/uploads/paroisses/" + fileName;
        filesNames.push(trimName);

        await pipeline(
          file.stream,
          fs.createWriteStream(
            `${__dirname}/../../client/public/uploads/paroisses/${fileName}`
          )
        );
      });
      // res.status(200).json({ message: "OK" });
    } catch (error) {
      res.status(404).json({ message: error });
      console.log(error);
    }
    paroisse.pictures = filesNames;
  }

  const newParoisse = new ParoisseModel(paroisse);

  try {
    await newParoisse.save();
    res.status(201).json({ result: newParoisse });
  } catch (error) {
    res.status(401).json({ message: error });
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

// READ
export const getAllParoisses = async (req, res) => {
  try {
    const paroisses = await ParoisseModel.find();
    res.status(200).json(paroisses);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getParoisse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    return res.status(500).json({ message: `Invalid ${id}` });

  try {
    const paroisse = await ParoisseModel.findById(id);
    res.status(200).json(paroisse);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// UPDATE
export const updateParoisse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    return res.status(500).json({ message: `Invalid ${id}` });

  const paroisse = req.body;
  let fileName;
  let filesNames = [];

  if (req.files !== null) {
    try {
      req.files.map(async (file) => {
        if (
          file.detectedMimeType !== "image/jpeg" &&
          file.detectedMimeType !== "image/png" &&
          file.detectedMimeType !== "image/jpg"
        ) {
          throw Error("Invalid file");
        }

        // if (file.size > 1000000) throw Error("Max size exceeded");

        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        fileName = req.body.name + uniqueSuffix + ".jpg";
        let trimName = "/uploads/paroisses/" + fileName;
        filesNames.push(trimName);

        await pipeline(
          file.stream,
          fs.createWriteStream(
            `${__dirname}/../../client/public/uploads/paroisses/${fileName}`
          )
        );
      });
      // res.status(200).json({ message: "OK" });
    } catch (error) {
      res.status(404).json({ message: error });
      console.log(error);
    }
    paroisse.pictures = filesNames;
  }

  try {
    await ParoisseModel.findByIdAndUpdate(id, paroisse);
    res.status(200).json({ resutl: paroisse });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// DELETE
export const deleteParoisse = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    return res.status(500).json({ message: `Invalid ${id}` });

  try {
    await ParoisseModel.findByIdAndRemove(id);
    res.status(200).json({ message: `${id} successfully deleted` });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

/// OTHERS ACTIONs
// Ajouter un membre du clergé
export const addPriest = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    return res.status(500).json({ message: `Invalid id: ${id}` });

  const { priestName, priestRole } = req.body;
  let priestPicture;
  if (req.file !== null) {
    if (
      req.file.detectedMimeType !== "image/jpeg" &&
      req.file.detectedMimeType !== "image/png" &&
      req.file.detectedMimeType !== "image/jpg"
    ) {
      return res.status(500).json({ message: "Invalid file detected" });
    }

    const fileName = priestName + ".jpg";

    try {
      await pipeline(
        req.file.stream,
        fs.createWriteStream(
          `${__dirname}/../../client/public/uploads/paroisses/priests/${fileName}`
        )
      );
    } catch (error) {}
    priestPicture = "/uploads/paroisses/priests/" + fileName;
  }
  try {
    await ParoisseModel.findByIdAndUpdate(id, {
      $push: {
        clergy: {
          priestName: priestName,
          priestRole: priestRole,
          priestPicture: priestPicture,
        },
      },
    });
    res.status(200).json({ message: `Priest added ` });
  } catch (error) {
    res.status(404).send(error);
  }
};

// Supprimer un membre du clergé
export const removePriest = async (req, res) => {
  const { id } = req.params;
  const { priestId } = req.body;
  if (!mongoose.isValidObjectId(id))
    return res.status(500).json({ message: `Invalid ${id}` });

  try {
    await ParoisseModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          clergy: {
            _id: priestId,
          },
        },
      },
      { new: true }
    );
    res.status(200).json({ message: `Priest successfully removed` });
  } catch (error) {
    res.status(404).send(error);
  }
};

// Affilier une paroisse à un utilisateur
export const chooseParoisse = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!mongoose.isValidObjectId(id))
    return res.status(500).json({ message: `Invalid ${id}` });

  try {
    await ParoisseModel.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          paroissiens: userId,
        },
      },
      { new: true }
    );

    await UserModel.findByIdAndUpdate(userId, { _paroisse: id }, { new: true });
    res
      .status(200)
      .json({ message: `User ${userId} successfully choosed paroisse ${id}` });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Supprimer affiliation une paroisse à un utilisateur
export const unChooseParoisse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(500).json({ message: `Invalid ${id}` });

  const { userId } = req.body;

  try {
    await ParoisseModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          paroissiens: userId,
        },
      },
      { new: true }
    );

    await UserModel.findByIdAndUpdate(userId, { _paroisse: "" }, { new: true });
    res
      .status(200)
      .json({
        message: `User ${userId} successfully unchoosed paroisse ${id}`,
      });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Chercher une paroisse par son nom
export const findParoisse = async (req, res) => {
  const { paroisse } = req.query;
  try {
    const paroisse = await ParoisseModel.findById({ name: text });
    res.status(200).json({ data: paroisse });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Paroisses les plus proches
export const getNearParoisses = async (req, res) => {
  const { geo } = req.params;
  let coord = geo.split(";").map(Number);
  try {
    const paroisses = await ParoisseModel.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: coord },
          $minDistance: 0,
          $maxDistance: 1500,
        },
      },
    });

    console.log(coord);
    res.status(200).json({ result: paroisses });
  } catch (error) {
    console.log(coord);
    console.log(error);
    res.status(400).send({ message: error });
  }
};

// Ajouter les messes
export const addMesses = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).send({ message: "Invalid id" });

  const { dayName, dayHour } = req.body;
  try {
    const paroisse = await ParoisseModel.findByIdAndUpdate(
      id,
      {
        $push: {
          messes: {
            dayName: dayName,
            dayHour: dayHour,
          },
        },
      },
      { new: true }
    );

    res.status(200).send({ result: paroisse });
  } catch (error) {
    res.status(400).send({ message: "Error updating Paroisse" });
  }
};

// Supprimer les messes
export const deleteMesses = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).send({ message: "Invalid id" });

  const { messeId } = req.body;
  try {
    const paroisse = await ParoisseModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          messes: {
            _id: messeId,
          },
        },
      },
      { new: true }
    );

    res.status(200).send({ result: paroisse });
  } catch (error) {
    res.status(400).send({ message: "Error updating Paroisse" });
  }
};

// Ajouter les confessions
export const addConfessions = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).send({ message: "Invalid id" });

  const { dayName, dayHour } = req.body;
  try {
    const paroisse = await ParoisseModel.findByIdAndUpdate(
      id,
      {
        $push: {
          confessions: {
            dayName: dayName,
            dayHour: dayHour,
          },
        },
      },
      { new: true }
    );

    res.status(200).send({ result: paroisse });
  } catch (error) {
    res.status(400).send({ message: "Error updating Paroisse" });
  }
};

// Supprimer les confessions
export const deleteConfessions = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).send({ message: "Invalid id" });

  const { confessionId } = req.body;
  try {
    const paroisse = await ParoisseModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          confessions: {
            _id: confessionId,
          },
        },
      },
      { new: true }
    );

    res.status(200).send({ result: paroisse });
  } catch (error) {
    res.status(400).send({ message: "Error updating Paroisse" });
  }
};
