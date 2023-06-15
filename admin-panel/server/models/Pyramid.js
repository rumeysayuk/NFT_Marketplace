const mongoose = require("mongoose");
const {requiredError} = require("../constants/messages/messages");
const Schema = mongoose.Schema;
const PyramidSchema = new Schema({
   xArea: {
      type: String,
      required: [true, requiredError("X")],
   },
   yArea: {
      type: String,
      required: [true, requiredError("Y")],
   },
   text: {
      type: String,
      required: [true, requiredError("Text")],
   },

},{ versionKey: false });

module.exports = mongoose.model("Pyramid", PyramidSchema);