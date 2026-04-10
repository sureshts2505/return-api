const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dqfbum5et",
  api_key: "272325465591628",
  api_secret: "gHrxVIL4Dzz20gWoofKBpdR1gns",
});

module.exports = cloudinary;