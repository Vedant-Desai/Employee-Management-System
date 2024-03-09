const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

//*-------------------------*
// Home Logic
//*-------------------------*

const home = async (req, res) => {
  try {
    res.status(200).send("Hellow using Router");
  } catch (error) {
    res.status(500).send(error);
  }
};

//*-------------------------*
// Register Logic
//*-------------------------*

const register = async (req, res) => {
  try {
    const {
      userName,
      email,
      phone,
      password,
      isManager,
      department,
      location,
    } = req.body;

    const userExist = await User.findOne({ email: email });

    console.log(`User Already exist :${userExist}`);

    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const newUser = await User.create({
      userName,
      email,
      phone,
      password,
      isManager,
      department,
      location,
    });
    console.log(`New User Created : ${newUser}`);
    res.status(200).send({
      message: "Registration Successful",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//*-------------------------*
// Login Logic
//*-------------------------*

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    const isPassValid = await userExist.comparePassword(password);
    if (isPassValid) {
      res.status(200).send({
        message: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid Email or Password!!!" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//*-------------------------*
// Get Current User Data Logic
//*-------------------------*

const getUser = async (req, res) => {
  try {
    const userData = req.user;
    console.log(`User Data : ${userData}`);
    res.status(200).send({ userData });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { home, register, login, getUser };
