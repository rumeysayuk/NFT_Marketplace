const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserForMetamaskWallet = new Schema(
  {
    walletNumber: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model(
  "UsersForMetamaskWallet",
  UserForMetamaskWallet
);
