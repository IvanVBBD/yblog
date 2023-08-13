const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  author:{
    type:String,
    min: 5,
    required: true
  },
  memeberSince:{
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.Schema("user", userSchema)