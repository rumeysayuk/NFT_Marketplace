const multer = require("multer")
const path = require("path")
const CustomError = require("../../helpers/error/CustomError")
const fs = require("fs")

const fileFilter = (req, file, cb) => {
   let allowedMimeTypes = ["images/jpg", "image/gif", "image/jpeg", "image/png", "video/mp4", "video/m4v"];
   if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
         new CustomError("Invalid Image/video type", 415),
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
      const extension = file.mimetype.split("/")[1];
      if (!req.savedImages) req.savedImages = []
      let url = `image_${Math.random().toString(36).substr(2, 9)}.${extension}`
      req.savedImages = [...req.savedImages, path.join(url)]
      cb(null, url);
   },
});

const upload = multer({storage, fileFilter})
module.exports = upload