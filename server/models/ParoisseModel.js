import mongoose from "mongoose";
import validator from "validator";

const paroisseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    province: {
      type: String,
      required: true,
    },
    diocese: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    pictures: {
      type: [String],
    },
    address: {
      type: String,
    },
    contact: {
      type: String,
    },
    email: {
      type: String,
    },
    history: {
      type: String,
    },
    clergy: {
      type: [
        {
          priestName: String,
          priestRole: String,
          priestPicture: String,
        },
      ],
    },
    messes: {
      type: [
        {
          id: Number,
          dayName: String,
          dayHour: {
            type: [String],
          },
        },
      ],
    },
    confessions: {
      type: [
        {
          id: Number,
          dayName: String,
          dayHour: {
            type: [String],
          },
        },
      ],
    },
    paroissiens: {
      type: [String],
    },
  },
  { timestamps: true }
);

const ParoisseModel = mongoose.model("Paroisse", paroisseSchema);
export default ParoisseModel;
