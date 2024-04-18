const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // TTL (Time-To-Live) set to 5 minutes (300 seconds)
  },
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
