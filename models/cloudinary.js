const mongoose = require("mongoose");

const cloudinarySchema = new mongoose.Schema({
  product_name: {
    type: String,
  },
  image: [
    {
      url: String,
      id: String,
    },
  ],
});
const Modelss = mongoose.model("cloudinary", cloudinarySchema);
module.exports = Modelss;
