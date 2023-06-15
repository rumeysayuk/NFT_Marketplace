const mongoose = require("mongoose")
const {requiredError} = require("../constants/messages/messages")

const Schema = mongoose.Schema

const ProductSchema = new Schema({
   name: String,
   categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: [true, requiredError("Kategori")],
   },
   gender: String,
   description: {
      type: String,
      required: [true, requiredError("Açıklama")]
   },
   color: {
      type: String,
      required: [false, requiredError("Renk")],
   },
   images: [{
      type: String,
      required: [true, requiredError("Resim")],
   }],
   stars: [
      {
         starId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "stars"
         },
         userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
         },
         viewDate: {
            type: Date
         }
      }
   ],
   deleted: {
      type: Boolean,
      default: false,
   },
   starAvg: {
      type: Number,
      default: 0
   },
   starCount: {
      type: Number,
      default: 0
   },
},{ versionKey: false })
module.exports = mongoose.model("products", ProductSchema);