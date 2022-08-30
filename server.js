const express = require("express");
const cors = require("cors");
const compression = require("compression");

const mongooseConnectDB = require("./config/db.js");
mongooseConnectDB(); // Connect to MongoDB

const app = express(); // Create an instance of express

// Middlewares
app.use(cors()); // Allow frontend to make HTTP calls to our Express app
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // Parse incoming form data
app.use(compression()); // Compress all routes

// Routes
const userRouter = require("./api-routes/user.route.js");

// Mount routes
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8080, () => {
  console.log("Server is running on port: 8080");
});

// Handle invalid routes
app
  .use((req, res, next) => {
    const error = new Error(
      `"${req.originalUrl}" route not found. Please check the URL and try again.`
    );
    error.status = 404;
    next(error);
  })
  .use((error, req, res, next) => {
    res.status(error.status || 500);

    res.json({
      message: error.message,
    });
  });
