const express = require("express")
const {updateUser,getAllUsers} = require("../controllers/userController");
const router = express.Router();

router.get("/getAllUsers",getAllUsers)
router.put("/:userId", updateUser);

module.exports = router;