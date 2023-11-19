import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  otp: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    ref: "users"
  },
  isUsed: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamp: true
});

const otpModel = mongoose.model("OTP", otpSchema);

export default otpModel;