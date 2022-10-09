import mongoose from "mongoose";
import EventModel from "../models/EventModel.js";

import fs from "fs";
import { promisify } from "util";
import stream from "stream";
const pipeline = promisify(stream.pipeline);

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Create
export const createEvent = async (req, res) => {
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

    fileName = req.body.posterId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../../client/public/uploads/events/${fileName}`
      )
    );
  }

  const { title, description, address, organizer, posterId } = req.body;

  let poster = req.body.poster;
  if (req.file !== null) {
    poster = "/uploads/events/" + fileName;
  } else poster = "/uploads/events/default-event.jpg";

  let startAt = req.body.startAt;
  //startAt = parseInt(startAt, 10);

  let endAt = req.body.endAt;
  //endAt = parseInt(endAt, 10);

  let dateEvent = req.body.dateEvent;
  dateEvent = dateEvent.split(",");

  let isPremium = req.body.isPremium;
  if (isPremium.toLowerCase() === "true") {
    isPremium = true;
  } else isPremium = false;

  const newEvent = new EventModel({
    poster,
    title,
    description,
    address,
    startAt,
    endAt,
    dateEvent,
    organizer,
    isPremium,
    posterId,
  });
  try {
    await newEvent.save();
    console.log(poster);
    res.status(200).json(newEvent);
  } catch (error) {
    res.status(404).send(error);
    console.log(error);
  }
};

//Read
export const getAllEvents = async (req, res) => {
  try {
    const events = await EventModel.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getEvent = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    return res.status(500).json({ message: `Invalid ${id}` });

  try {
    const event = await EventModel.findById(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getPremiumEvents = async (req, res) => {
  try {
    const event = await EventModel.find({ isPremium: true });
    res.status(200).json(event);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getOthersEvents = async (req, res) => {
  try {
    const event = await EventModel.find({ isPremium: false });
    res.status(200).json(event);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Update
export const updateEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(500).json({ message: `Invalid ${id}` });

  const {
    title,
    description,
    address,
    startAt,
    endAt,
    dateEvent,
    organizer,
    posterId,
  } = req.body;

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

      fileName = req.body.posterId + Date.now() + ".jpg";

      await pipeline(
        req.file.stream,
        fs.createWriteStream(
          `${__dirname}/../../client/public/uploads/events/${fileName}`
        )
      );
    } else {
      poster = fileName;
    }
    if (req.file !== null) {
      poster = "/uploads/events/" + fileName;
    } else poster = fileName;

    const updatedEvent = {
      poster,
      title,
      description,
      address,
      startAt,
      endAt,
      dateEvent,
      organizer,
      posterId,
      _id: id,
    };

    await EventModel.findByIdAndUpdate(id, updatedEvent, { new: true });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//Delete
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(500).json({ message: `Invalid ${id}` });

  try {
    await EventModel.findByIdAndRemove(id);
    res.status(200).json({ message: `Event: ${id} successfully removed` });
  } catch (error) {
    res.status(404).send(error);
  }
};
