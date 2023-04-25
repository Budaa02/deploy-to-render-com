const mongoose = require("mongoose");

const cloudinarySchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  image: {
    type: [String],
  },
});
const Modelss = mongoose.model("cloudinary", cloudinarySchema);
module.exports = Modelss;
