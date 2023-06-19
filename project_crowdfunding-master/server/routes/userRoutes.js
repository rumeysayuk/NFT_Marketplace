const express = require("express");
const { loginWallet } = require("../controllers/walletController");
const router = express.Router();

router.post("/loginWithMetamask", loginWallet);

module.exports = router;
