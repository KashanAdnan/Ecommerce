import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLenght: 10,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isVerify: {
      type: Boolean,
      default: false,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamp: true }
);

const User = mongoose.model("user", userSchema);

export default User;
