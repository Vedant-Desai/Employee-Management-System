const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send({ message: "Please Authenticate" });
  }

  const jwtToken = token.replace("Bearer ", "").trim();
  // console.log("Auth token from frontend", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await User.findOne({ _id: isVerified.userId }).select({
      password: 0,
    });

    req.user = userData;
    req.token = jwtToken;
    req.isManager = userData.isManager;
    req.userId = userData._id.toString();

    // console.log("Current User", userData);
  } catch (error) {
    console.log(error);
    next(error);
  }
  next();
};

module.exports = authMiddleware;
