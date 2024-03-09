const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isManager: {
    type: Boolean,
    default: false,
  },
  department: {
    type: String,
    default: null,
  },
});

//Secure the password using bcryptjs
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
    } catch (error) {
      next(error);
    }
  }
  next();
});

//Compare the password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Generate Token
userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isManager: this.isManager,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "2d",
      }
    );
    return token;
  } catch (error) {
    console.error(error);
  }
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
