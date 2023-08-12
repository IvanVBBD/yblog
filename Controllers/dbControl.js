const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const Response = require('../Tools/Response')

//local testing uri
const uri =
  "mongodb://0.0.0.0:27017/blogPost";

const blogModel = require("../models/blogPost");

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => console.error(err.message));
db.once("connected", () => console.log("Connected to db"));

// CONSTANTS
const SUCCESS_POST = "Successfully inserted";
const SUCCESS_PATCH = "Successfully updated";
const SUCCESS_DELETE = "Successfully deleted";
const SUCCESS_GET = "Successfully retrieved";

const FAIL_POST = "Failed to insert";
const FAIL_PATCH = "Failed to update";
const FAIL_DELETE = "Failed to delete";
const FAIL_GET = "Failed to retrieve";


const postComment = async (author, postID, text) => {
  try {
    const updatedPost = await blogModel.findByIdAndUpdate(
      postID,
      {
        $push: { comments: { text, author } },
      },
      { new: true }
    );

    //don't necessarily need updated post returned unless we want specifics
    return new Response(200, SUCCESS_POST, updatedPost);
  } catch (e) {
    return new Response(500, FAIL_POST, e);
  }
};

const createPost = async(author,content,title) =>{
    try {
      const newPost = await blogModel.create({
        title,
        content,
        author,
      });
      return new Response(200, SUCCESS_POST, newPost)
    } catch (error) {
      return new Response(500, FAIL_POST, error)
    }
}

module.exports = {postComment, createPost}