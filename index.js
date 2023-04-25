const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cloudinary = require("./config/cloudinary");
const uploader = require("./config/config");
const cloudinaryModel = require("./models/cloudinary");
const { default: cloudinaryRouter } = require("./routes/cloudinary");
const Modelss = require("./models/cloudinary");
const PORT = process.env.PORT;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    data: [],
  });
});
// app.use("/cloud", cloudinaryRouter);
const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (err, res) => {
      if (err) return res.status(500).send("upload image error");
      resolve({
        res: res.secure_url,
      });
    });
  });
};
app.post("/upload", uploader.array("img", 3), async (req, res) => {
  const urls = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newPath = await cloudinaryImageUploadMethod(path);
    urls.push(newPath);
  }
  const product = new cloudinaryModel({
    product_name: "gg",
    image: urls.map((url) => url.res),
  });
  res.send(product);
});
// app.post("/upload", uploader.array("file", 2), async (req, res) => {
//   const upload = await cloudinary.v2.uploader.upload(req.file.path);
//   console.log(upload.secure_url);
//   // const body = request.body;
//   // const result = await cloudinaryModel.create(body);

//   const result = await Modelss.create({
//     product_name: "gg",
//     image: upload.secure_url,
//   });
//   res.send(result);
//   // return res.json({
//   //   success: true,
//   //   file: upload.secure_url,
//   // });
// });

app.listen(PORT, () => {
  mongoose
    .connect(MONGO_CONNECTION_STRING)
    .then(() => console.log("Database connected succesfully"))
    .catch((error) => console.error(error));
  console.log(`Express Application is running on http://localhost:${PORT}`);
});
