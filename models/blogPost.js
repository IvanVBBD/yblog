const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      min: 5,
      max: 50
    },
    content: {
      type: String,
      required: true,
      min: 10,
      max: 300
    },
    author: {
      type: String,
      required: true
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    comments: [
      {
        text: String,
        author: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  });

  module.exports = mongoose.model("blogPost",blogPostSchema);


