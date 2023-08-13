const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  author:{
    type:String,
    min: 5,
    required: true,
    unique: true
  },
  memeberSince:{
    type: String,
    default: new Date().toLocaleDateString()
  }
})

module.exports = mongoose.model("user", userSchema)