const express = require("express");
const authRoutes = require("./authRoutes")
const userRoutes = require("./userRoutes")
const router = express.Router();
const upload = require("../middlewares/lib/multerUpload")

router.use("/upload", upload.single("image"), (req, res) => {
   res.status(200).json({
      url: (req.savedImages || []).map(image => process.env.HOST + "/" + image),
      message: "Image upload successfully",
   })
})

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

module.exports = router;