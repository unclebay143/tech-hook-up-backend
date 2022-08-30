const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

function mongooseConnectDB() {
  const devConnectionURI = process.env.DB_STRING;
  const prodConnectionURI = process.env.DB_STRING_PROD;

  const connectionURI =
    process.env.NODE_ENV === "production"
      ? prodConnectionURI
      : devConnectionURI;

  mongoose.connect(
    connectionURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) return console.log(err);
      console.log("MongoDB connected");
      console.log(
        "MongoDB Connection -- Ready state is:",
        mongoose.connection.readyState
      );
    }
  );
}

module.exports = mongooseConnectDB;
