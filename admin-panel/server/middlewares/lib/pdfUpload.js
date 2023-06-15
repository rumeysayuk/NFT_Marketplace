const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      const rootDir = path.dirname(require.main.filename);
      fs.mkdirSync(path.join(rootDir, "/public/pdf"), {recursive: true})
      cb(null, path.join(rootDir, "/public/pdf"));
   },
   filename: function (req, file, cb) {
      const extension = file.mimetype.split("/")[1];   //mimetype: 'application/pdf'
      let url = `pdf_${Math.random().toString(36).substr(2, 9)}.${extension}`
      req.savedImage = path.join(url)
      cb(null, url);
   },
});

const pdfUpload = multer({storage});
module.exports = pdfUpload