import mongoose from "mongoose";

const demandeSchema = mongoose.Schema({
  name: String,
  textDemand: String,
  isValid: {
    type: Boolean,
    default: false,
  },
  dayMesse: String,
  hourMesse: String,
  _idParoisse: String,
});

const DemandeModel = mongoose.model("Demandes", demandeSchema);

export default DemandeModel;
