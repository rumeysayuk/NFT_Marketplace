const mongoose = require("mongoose")

const databaseConnectionHelper = async () => {
   return await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
}
module.exports = databaseConnectionHelper