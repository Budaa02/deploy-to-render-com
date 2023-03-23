const uploader = require("multer");

module.exports = uploader({
  storage: uploader.diskStorage({}),
  limits: { fileSize: 100_000_00 }, // 10MB data
});
