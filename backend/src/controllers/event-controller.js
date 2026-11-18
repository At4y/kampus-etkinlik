import mongoose from "mongoose";
import { Event } from "../models/event-model.js";

export async function getEvents(req, res, next) {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

export async function getEventById(req, res, next) {
  try {
    const { id } = req.params;

    // Biçimi yanlış id'de findById CastError fırlatır, o yüzden önce kontrol ediyoruz
    if (!mongoose.isValidObjectId(id)) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    res.json(event);
  } catch (err) {
    next(err);
  }
}

export async function createEvent(req, res, next) {
  try {
    const event = await Event.create(req.body ?? {});
    res.status(201).json(event);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: { message: err.message } });
    }
    next(err);
  }
}