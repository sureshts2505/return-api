const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "returnMe",
    public_id: (req, file) => {
      return Date.now() + "-" + file.originalname.split(".")[0];
    },
  },
});

const upload = multer({
  storage
});

module.exports = upload;