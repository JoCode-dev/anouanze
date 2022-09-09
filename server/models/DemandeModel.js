import mongoose from "mongoose";

const demandeSchema = mongoose.Schema(
  {
    name: String,
    number: String,
    textDemand: String,
    isValid: {
      type: Boolean,
      default: false,
    },
    dayMesse: String,
    hourMesse: String,
    _idParoisse: String,
  },
  { timestamps: true }
);

const DemandeModel = mongoose.model("Demandes", demandeSchema);

export default DemandeModel;
