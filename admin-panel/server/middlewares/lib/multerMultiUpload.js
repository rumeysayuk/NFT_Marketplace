const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");
const fs = require("fs");

const fileFilter = (req, file, cb) => {
   let allowedMimeTypes = ["images/jpg", "image/gif", "image/jpeg", "image/png", "video/mp4", "video/x-m4v", "video/m4v"];
   if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
         new CustomError("Please Provide a Valid Image File!", 415),
         false
      );
   }
   return cb(null, true);
};

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      const rootDir = path.dirname(require.main.filename);
      fs.mkdirSync(path.join(rootDir, "/public/images"), {recursive: true})
      cb(null, path.join(rootDir, "/public/images"));
   },
   filename: function (req, file, cb) {
      if (!req.savedImages) req.savedImages = []
      const extension = file.mimetype.split("/")[1];
      let url = `image_${Math.random().toString(36).substr(2, 9) + new Date().getTime().toString()}.${extension}`
      req.savedImages = [...req.savedImages, path.join(url)]
      cb(null, url);
   },
});

const multiUpload = multer({storage, fileFilter});
module.exports = multiUpload