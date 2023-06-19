const asyncErrorWrapper = require("express-async-handler");
const UserForMetamaskWallet = require("../models/UserForMetamaskWallet");
const CustomError = require("../helpers/error/CustomError");

const loginWallet = asyncErrorWrapper(async (req, res, next) => {
  let oldUser = await UserForMetamaskWallet.findOne({
    walletNumber: req.body.walletNumber,
  });
  if (oldUser)
    return next(
      new CustomError("This wallet number is aldready in our system!", 400)
    );
  let user = await UserForMetamaskWallet.create({ ...req.body });
  return res.send(user);
});

module.exports = { loginWallet };
