const Multer = require("multer");
const path = require("path");
const fs = require("fs");


const uploadFolder = "uploads";

if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);


const ensureFolder = (folder) => {
  const fullPath = path.join(uploadFolder, folder);
  if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath);
  return fullPath;
};


const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    
    const folder = req.body.type === "lost" ? "lost" : "found";
    const fullPath = ensureFolder(folder);
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {

    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};


const upload = Multer({ storage, fileFilter });

module.exports = upload;