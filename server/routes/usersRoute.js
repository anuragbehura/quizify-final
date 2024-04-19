const router = require('express').Router();
const User = require('../models/userModel');
const OTP = require('../models/otpModel');
const bcrypt = require('bcryptjs');
const otpGenerator = require('otp-generator')
const nodemailer = require('nodemailer');
require("dotenv").config({path: 'server\.env'});
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

// const EMAIL = process.env.EMAIL;
// const EMAIL_PASS = process.env.PASSWORD;

// Function to send verification email
const sendVerifyMail = async (name, email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      // requireTLS: true,
      auth: {
        user: "behura960@gmail.com",
        pass: "qtgp sjik holm ryvj",
      }
    });
    const mailOptions = {
      from: "behura960@gmail.com",
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Hi ${name}, this is your ${otp} '(one time password)' to verify your email.</p>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

// User registration API
router.post('/register', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(409).send({ message: 'User already exists', success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();

    // Generate OTP
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false }); // Generate a 6-digit OTP

    // Save OTP along with user's email in OTP schema
    const newOTP = new OTP({ email: req.body.email, otp });
    await newOTP.save();

    sendVerifyMail(req.body.name, req.body.email, otp); // Send verification email

    res.status(201).send({
      message: 'User created successfully. Verification email sent.',
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});


// User login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ message: "User doesn't exist", success: false });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: 'Invalid password', success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).send({
      message: 'User logged in successfully',
      success: true,
      token: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// Get user info
router.post("/get-user-info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.status(200).send({
      message: "User info fetched successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// Verify Email route
router.post('/verify-email', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the OTP record in the OTP schema
    const otpRecord = await OTP.findOne({ email });

    // Check if OTP record exists
    if (!otpRecord) {
      return res.status(404).send({ message: 'OTP record not found', success: false });
    }

    // Check if OTP matches
    if (otpRecord.otp !== otp) {
      return res.status(400).send({ message: 'Invalid OTP', success: false });
    }

    // Update the user's isVerified field in the User schema
    await User.updateOne({ email }, { $set: { isVerified: true } });

    // Delete the OTP record from OTP schema as it's no longer needed
    await OTP.deleteOne({ email });

    res.status(200).send({ message: 'Email verified successfully', success: true });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});


module.exports = router;
