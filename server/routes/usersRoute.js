const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
// user registration api

const EMAIL = process.env.EMAIL;

router.post('/register', async (req, res) => {
  try {
    // check if user already exists
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: 'Oh! User already exists', success: false });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // create new user
    const newUser = new User(req.body);
    await newUser.save();

    res.send({
      message: 'Congrats User Created Successfully',
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// user login

router.post('/login', async (req, res) => {
  try {
    // check if user already exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User doesn't exist", success: false });
    }

    // check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res
        .status(200)
        .send({ message: 'Invalid Password!', success: false });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.send({
      message: 'User Logged in Successfully',
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// get user info

router.post("/get-user-info", authMiddleware, async(req,res) => {
  try {
    const user = await User.findById(req.body.userId)
    res.send({
      message:"User info fetched succesfully",
      success: true,
      data:user
    })
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: error
    })
  }
})


module.exports = router;
// from here we go to users.js in api call
