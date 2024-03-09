require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const authRoute = require("./routers/auth-router");
const employeeRoute = require("./routers/employee-router");
const departmentRoute = require("./routers/department-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");

// Middleware to allow cross-origin requests
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE,HEAD,OPTIONS,PATCH",
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

app.use("/api/auth/", authRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/department", departmentRoute);
app.use(errorMiddleware);

// Serve static assets if in production
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

connectDb().then(() => {
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on port: ${PORT}`);
  });
});
