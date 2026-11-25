import mongoose from "mongoose";
import { Event } from "../models/event-model.js";
import { todayStart } from "../utils/date.js";

// PATCH ile değiştirilmesine izin verilmeyen alanlar
const PROTECTED_FIELDS = ["_id", "createdAt", "updatedAt", "__v"];

// Olmayan ya da geçersiz id için aynı 404 yanıtı her yerde kullanılır
function notFound(res) {
  return res.status(404).json({ error: { message: "Event not found" } });
}

function badRequest(res, message) {
  return res.status(400).json({ error: { message } });
}

export async function getEvents(req, res, next) {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (typeof category === "string" && category) {
      filter.category = category;
    }
    if (typeof search === "string" && search) {
      // ( * ? gibi işaretler regex'i bozmasın diye başlarına \ koyuyoruz
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.title = { $regex: escaped, $options: "i" };
    }

    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

export async function getUpcomingEvents(req, res, next) {
  try {
    // Bugün ve sonrası, en yakın tarih önce
    const events = await Event.find({ date: { $gte: todayStart() } }).sort({
      date: 1,
      time: 1,
    });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

export async function getEventById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return notFound(res);

    const event = await Event.findById(id);
    if (!event) return notFound(res);

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
    if (err.name === "ValidationError" || err.name === "CastError") {
      return badRequest(res, err.message);
    }
    next(err);
  }
}

export async function updateEvent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return notFound(res);

    const body = req.body ?? {};
    if (Object.keys(body).length === 0) {
      return badRequest(res, "Body is empty");
    }

    const blocked = Object.keys(body).filter((key) =>
      PROTECTED_FIELDS.includes(key)
    );
    if (blocked.length > 0) {
      return badRequest(res, `${blocked.join(", ")} cannot be changed`);
    }

    const event = await Event.findByIdAndUpdate(id, body, {
      returnDocument: "after", // yanıtta güncellenmiş kayıt dönsün
      runValidators: true, // schema kuralları güncellemede de çalışsın
    });
    if (!event) return notFound(res);

    res.json(event);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return badRequest(res, err.message);
    }
    next(err);
  }
}

export async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return notFound(res);

    const event = await Event.findByIdAndDelete(id);
    if (!event) return notFound(res);

    // 204 yanıtının gövdesi olmaz, sadece status gönderiyoruz
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}