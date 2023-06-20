const asyncErrorWrapper = require("express-async-handler");
const UserForMetamaskWallet = require("../models/UserForMetamaskWallet");
const User =require("../models/User");

const getAllUsers = asyncErrorWrapper(async (req, res) => {
   let users = await UserForMetamaskWallet.find()
   res.status(200).json({success: true, data: users})
})

const updateUser = asyncErrorWrapper(async (req, res) => {
   const { userId } = req.params;
   const updatedUserData = req.body;
   try {
      const updatedUser = await UserForMetamaskWallet.findByIdAndUpdate(userId, updatedUserData, { new: true });
      if (!updatedUser) {
         return res.status(404).json({ success: false, message: 'User not found in our system.' });
      }
      res.status(200).json({ success: true, data: updatedUser });
   } catch (error) {
      res.status(500).json({ success: false, message: 'An error occurred while updating the user', error: error.message });
   }
})

const updateAdminInfo = asyncErrorWrapper(async (req, res) => {
   const { userId } = req.params;
   const updatedUserData = req.body;
   try {
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
      if (!updatedUser) {
         return res.status(404).json({ success: false, message: 'User not found in our system.' });
      }
      res.status(200).json({ success: true, data: updatedUser });
   } catch (error) {
      res.status(500).json({ success: false, message: 'An error occurred while updating the user', error: error.message });
   }
})

module.exports = {getAllUsers,updateUser,updateAdminInfo}