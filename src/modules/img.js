const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  img: {
    data: Object,
    contentType: String,
  },
});

const imgModule = mongoose.model("img", imgSchema);
module.exports = imgModule;
