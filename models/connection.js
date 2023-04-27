const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;
const options = { connectTimeoutMS: 2000 };

mongoose
  .connect(DB_URI, options)
  .then(() => console.log("Database connected"))
  .catch((error) => {
    if (error) return console.error(error);
  });
