import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    poster: {
      type: String,
      default: "/uploads/events/default-event.jpg",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    startAt: {
      type: Date,
    },
    endAt: {
      type: Date,
    },
    dateEvent: {
      type: [Date],
    },
    organizer: {
      type: String,
    },
    posterId: {
      type: String,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const EventModel = mongoose.model("Event", eventSchema);
export default EventModel;
