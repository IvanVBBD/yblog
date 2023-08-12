const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    createdAt: { type: Date, default: Date.now },
    comments: [
      {
        text: String,
        author: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  });


  module.exports = mongoose.model("blogPost",blogPostSchema);


