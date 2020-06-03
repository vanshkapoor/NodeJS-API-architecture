const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
});

module.exports = mongoose.model("User", userSchema);
