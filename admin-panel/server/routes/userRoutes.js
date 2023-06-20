const express = require("express")
const {updateUser,getAllUsers, updateAdminInfo} = require("../controllers/userController");
const router = express.Router();

router.get("/getAllUsers",getAllUsers)
router.put("/:userId", updateUser);
router.put("/admin/:userId",updateAdminInfo)

module.exports = router;