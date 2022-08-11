import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    _paroisse: {
        type: String,
    },
    contact: {
        type: String,
        unique: true,
        minlength: 10,
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail],
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    adminType: {
        type: Boolean,
        default: false,
    },
    moderatorType: {
        type: Boolean,
        default: false
    },
    userType: {
        type: Boolean,
        default: true
    }

}, {timestamps: true});

//Crypt password before save user
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next()
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;