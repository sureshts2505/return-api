const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "returnMe",
    resource_type: "image",

    
    public_id: (req, file) => {
      return Date.now() + "-" + file.originalname;
    },
  },
});

const upload = multer({
  storage,

  
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files allowed"), false);
    }
  },
});

module.exports = upload;