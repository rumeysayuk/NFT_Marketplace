const asyncErrorWrapper = require("express-async-handler")
const CustomError = require("../helpers/error/CustomError")
const User = require("../models/User")
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");
const {EMAIL_UNIQUE_ERROR} = require("../constants/messages/messages");
const bcrypt = require("bcryptjs")


const login = asyncErrorWrapper(async (req, res, next) => {
   const {email, password} = req.body
   if (!(email && password)) return next(new CustomError("Email or password is required", 400))
   const user = await User.findOne({$or: [{email: email}]}).select("+password")
   if (!user) return next(new CustomError("User not found", 400))
   if (user.isBlocked === true) return next(new CustomError("Your account is blocked", 400));
   if (!bcrypt.compareSync(password, user.password)) return next(new CustomError("Invalid credentials", 400));
   sendJwtToClient(user, res, (user.role === "admin" ? true : false));
})

const register = asyncErrorWrapper(async (req, res, next) => {
   const {password, confirmPassword} = req.body
   let oldUser = await User.findOne({email: (req.body.email || "").trim()})
   if (oldUser) return next(new CustomError(EMAIL_UNIQUE_ERROR, 400))
   if (password !== confirmPassword) return res.status(400).json({message: "Passwords don't match !"})
   req.body.email = (req.body.email || "").trim()
   req.body.password = (req.body.password || "").trim()
   const user = await User.create({...req.body});
   sendJwtToClient(user, res);
})

const getHomePage = asyncErrorWrapper(async (req, res) => {
   return res.status(200).json({ success: true, user: req.user })
})



module.exports = {login, register, getHomePage}