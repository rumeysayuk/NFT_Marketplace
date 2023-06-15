const mongoose = require("mongoose");
const {requiredError} = require("../constants/messages/messages");
const Schema = mongoose.Schema;
const KanbanSchema = new Schema({
   title: {
      type: String,
      required: [true, requiredError("Title")],
   },
   status: {
      type: Boolean,
      required: [true, requiredError("Status")],
   },
   summary: {
      type: String,
      required: [true, requiredError("Summary")],
   },
   type: {
      type: String,
      required: [false, requiredError("Type")],
   },
   priority: {
      type: Boolean,
      required: [false, requiredError("Priority")],
   },
   tags: [String],
   estimate: {String},
   assignee: {
      type: String,
      required: [false, requiredError("Assignee")],
   },
   rankId: {String},
   color: {String},
   className: {String},
},{ versionKey: false });

module.exports = mongoose.model("Pyramid", KanbanSchema);