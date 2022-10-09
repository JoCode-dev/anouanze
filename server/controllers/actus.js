import mongoose from "mongoose";
import ActuModel from "../models/ActuModel.js";

import fs from "fs";
import { promisify } from "util";
import stream from "stream";
const pipeline = promisify(stream.pipeline);
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createActu = async (req, res) => {
  let fileName;

  if (req?.file !== null) {
    if (
      req?.file.detectedMimeType !== "image/jpeg" &&
      req?.file.detectedMimeType !== "image/png" &&
      req?.file.detectedMimeType !== "image/jpg"
    ) {
      throw Error("Invalid File");
    }

    fileName = req.body.title + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../../client/public/uploads/actus/${fileName}`
      )
    );
  }

  const {
    poster = req.file !== null
      ? "/uploads/actus/" + fileName
      : "/uploads/actus/default-actu.jpg",
    title,
    description,
    address,
    _paroisseId,
  } = req.body;

  const newActu = new ActuModel({
    poster,
    title,
    description,
    address,
    _paroisseId,
  });

  try {
    await newActu.save();
    res.status(201).json(newActu);
  } catch (error) {
    res.status(401).send(error);
  }
};

export const updateActu = async (req, res) => {
  const { id } = req.params;

  const { title, description, address, _paroisseId } = req.body;

  let poster = req.body.poster;

  try {
    let fileName;
    if (req.file !== null) {
      try {
        if (
          req.file.detectedMimeType !== "image/jpg" &&
          req.file.detectedMimeType !== "image/png" &&
          req.file.detectedMimeType !== "image/jpeg"
        ) {
          throw Error("Invalid file detected");
        }
      } catch (error) {
        res.status(500).json(error);
      }

      fileName = req.body._paroisseId + Date.now() + ".jpg";

      await pipeline(
        req.file.stream,
        fs.createWriteStream(
          `${__dirname}/../../client/public/uploads/actus/${fileName}`
        )
      );
    } else {
      poster = fileName;
    }
    if (req.file !== null) {
      poster = "/uploads/actus/" + fileName;
    } else poster = fileName;

    const updatedActu = {
      poster,
      title,
      description,
      address,
      _paroisseId,
      _id: id,
    };

    await ActuModel.findByIdAndUpdate(id, updatedActu, { new: true });
    res.status(200).json(updatedActu);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getActusById = async (req, res) => {
  const { id } = req.params;
  try {
    const actus = await ActuModel.find({ _paroisseId: id });
    res.status(200).json({ data: actus });
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getAllActus = async (req, res) => {
  try {
    const actus = await ActuModel.find();
    res.status(200).json(actus);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getOneActu = async (req, res) => {
  const { id } = req.params;
  try {
    const Actu = await ActuModel.findById(id);
    res.status(200).json({ data: Actu });
  } catch (error) {
    res.status(404).send(error);
  }
};

export const deleteActu = async (req, res) => {
  const { id } = req.params;
  try {
    await ActuModel.findByIdAndRemove(id);
    res.status(200).json({ message: "Actu has been deleted" });
  } catch (error) {
    res.status(404).send(error);
  }
};
