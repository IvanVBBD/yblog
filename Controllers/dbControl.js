const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://admin:admin@yblog.thdiw8i.mongodb.net/?retryWrites=true&w=majority";
const blogModel = require("../models/blogPost");

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => console.error(err.message));
db.once("connected", () => console.log("Connected to db"));

const postComment = async (author, postID, text) => {
  try {
    const updatedPost = await blogModel.findByIdAndUpdate(
      postID,
      {
        $push: { comments: { text, author } },
      },
      { new: true }
    );

    return updatedPost;
  } catch (e) {
    console.log(e);
    return {};
  }
};

const createPost = async(author,content,title) =>{
    const newPost = await blogModel.create({
        title,
        content,
        author,
      });
}
