import mongoose from "mongoose";

const actuSchema = mongoose.Schema(
  {
    poster: {
      type: String,
      default: "/uploads/actus/default-actu.jpg",
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
    _paroisseId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ActuModel = mongoose.model("Actu", actuSchema);
export default ActuModel;
