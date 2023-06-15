const {isTokenIncluded, getAccessTokenFromHeader} = require("../../helpers/authorization/tokenHelpers");
const jwt = require("jsonwebtoken");
const CustomError = require("../../helpers/error/CustomError");
const User = require("../../models/User");
const asyncErrorWrapper = require("express-async-handler");

const getAccessToRoute =asyncErrorWrapper( async (req, res, next) => {
   if (!isTokenIncluded(req)) return next(new CustomError("Please first login", 401))
   let token = getAccessTokenFromHeader(req)
   await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) return next(new CustomError("Invalid Token", 401))
      let user = await User.findById(decoded.sub)
      if (!user) return next(new CustomError("Invalid Token", 401))
      req.user = user;
      next();
   });
})

module.exports = {getAccessToRoute}