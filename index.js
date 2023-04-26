const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cloudinary = require("./config/cloudinary");
const uploader = require("./config/config");
const cloudinaryModelss = require("./models/cloudinary");
// const cloudinaryModel = require("./models/cloudinary");
const bodyParser = require("body-parser");
const fs = require("fs");
// const cloudinaryRouter = require("./routes/cloudinary");

const PORT = process.env.PORT;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// app.use("/cloud", cloudinaryRouter);
app.get("/", (req, res) => {
  res.send("Cloudinary Router");
});

app.post("/upload-images", uploader.array("image"), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images");

  console.log(req.files);
  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    console.log(urls);
    const result = await cloudinaryModelss.create({
      product_name: "gg",
      image: urls,
    });
    // res.send(result);
    return res.json({
      success: true,
      data: result,
    });
    // console.log(urls.url[0]);
    // res.status(200).json({
    //   message: "images uploaded successfully",
    //   data: urls,
    // });
  } else {
    res.status(405).json({
      err: `${req.method}method not allowed`,
    });
  }
});

app.listen(PORT, () => {
  mongoose
    .connect(MONGO_CONNECTION_STRING)
    .then(() => console.log("Database connected succesfully"))
    .catch((error) => console.error(error));
  console.log(`Express Application is running on http://localhost:${PORT}`);
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
