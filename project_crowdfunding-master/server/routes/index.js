const express = require("express");
const userRoutes = require("./userRoutes");
const router = express.Router();
const upload = require("../middlewares/lib/multerUpload");

router.use("/upload", upload.single("image"), (req, res) => {
  res.status(200).json({
    url: (req.savedImages || []).map((image) => process.env.HOST + "/" + image),
    message: "Image upload successfully",
  });
});

router.use("/users", userRoutes);

module.exports = router;
