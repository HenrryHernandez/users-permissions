const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const db = () => {
  try {
    mongoose.connect(process.env.DATABASE_LOCAL, {});

    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to DB");
  }
};

module.exports = db;
