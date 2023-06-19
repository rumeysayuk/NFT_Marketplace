const express = require("express")
const {login, register,getHomePage} = require("../controllers/authController");
const {getAccessToRoute} = require("../middlewares/authorization/auth");
const router = express.Router()


router.post("/login", login);
router.post("/register", register)
router.get("/getHomePage", getAccessToRoute, getHomePage);

module.exports = router;