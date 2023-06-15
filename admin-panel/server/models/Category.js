const mongoose = require("mongoose")
const {requiredError, minLengthError} = require("../constants/messages/messages");
const Schema = mongoose.Schema
const CategorySchema = new Schema({
   name: {
      type: String,
      required: [true, requiredError("Category name")],
      minlength: [3, minLengthError("Category name", 3)]
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
   updatedAt: {
      type: Date,
      default: Date.now
   },
   deleted: {
      type: Boolean,
      default: false
   },
   deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users"
   },
},{ versionKey: false })

module.exports = mongoose.model("Categories", CategorySchema);
