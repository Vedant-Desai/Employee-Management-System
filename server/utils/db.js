const mongoose = require("mongoose");
const dbURI = process.env.DB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Database Connected");
  } catch (error) {
    console.error(`Database connection Failed ; ${error}`);
    process.exit(1);
  }
};

module.exports = connectDb;
