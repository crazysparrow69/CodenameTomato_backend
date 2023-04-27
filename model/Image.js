const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  file: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("image", imageSchema);
