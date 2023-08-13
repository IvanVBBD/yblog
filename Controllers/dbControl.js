const mongoose = require("mongoose");
const Response = require("../Tools/Response");

//local testing uri
const uri = "mongodb://0.0.0.0:27017/blogPost";

const hostedURI =
  "mongodb+srv://admin:admin@yblog.thdiw8i.mongodb.net/?retryWrites=true&w=majority";

const blogModel = require("../models/blogPost");

mongoose.connect(hostedURI, {
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

const postComment = async (author, text, postID) => {
  try {
    const updatedPost = await blogModel.findOneAndUpdate(
      { postID: postID }, // Find the document based on the 'postID' field
      {
        $push: { comments: { text, author } },
      },
      { new: true }
    );

    // don't necessarily need updated post returned unless we want specifics
    return new Response(200, SUCCESS_POST, updatedPost);
  } catch (e) {
    console.log(e);
    return new Response(500, FAIL_POST, e);
  }
};

const createPost = async (author, content, title, time, postID) => {
  try {
    const newPost = await blogModel.create({
      title,
      content,
      author,
      time,
      postID,
    });
    return new Response(200, SUCCESS_POST, newPost);
  } catch (error) {
    console.log(error);
    return new Response(500, FAIL_POST, error);
  }
};

const getAuthorPosts = async (author) => {
  try {
    const posts = await blogModel.find({ author }).sort('-createdAt');
    return new Response(200, SUCCESS_POST, posts);
  } catch (error) {
    return new Response(500, FAIL_POST, error);
  }
};

const getLatestPosts = async (count) => {
  try {
    const latestPosts = await blogModel
      .find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order to get the latest posts
      .limit(count) // Limit the number of results to the specified count
      .exec();

    return new Response(200, SUCCESS_POST, latestPosts);
  } catch (e) {
    console.log(e);
    return new Response(500, FAIL_POST, e);
  }
};

module.exports = { postComment, createPost, getAuthorPosts, getLatestPosts };
