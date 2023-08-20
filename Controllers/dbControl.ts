import mongoose, { ConnectOptions } from 'mongoose';
import blogModel from '../models/blogPost';
import userModel from '../models/user';
import Response from "../Tools/Response";

//local testing uri
const uri = "mongodb://0.0.0.0:27017/blogPost";

const hostedURI =
  "mongodb+srv://admin:admin@yblog.thdiw8i.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(hostedURI);

const db = mongoose.connection;

db.on("error", (err) => console.error(err.message));
db.once("connected", () => console.log("Connected to db"));

// CONSTANTS
const SUCCESS_POST = "Successfully posted";
const SUCCESS_PATCH = "Successfully updated";
const SUCCESS_DELETE = "Successfully deleted";
const SUCCESS_GET = "Successfully retrieved";

const FAIL_POST = "Failed to insert";
const FAIL_PATCH = "Failed to update";
const FAIL_DELETE = "Failed to delete";
const FAIL_GET = "Failed to retrieve";

const EXISTS = 'User already exists'
const ERR_DUPLICATE = 11000;
const USERNAME = "username"

export const postComment = async (author : string, text : string, postID : string) => {
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

export const createPost = async (author : string, content : string, title : string, time : any, postID : string) => {
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
    return new Response(500, FAIL_POST, error);
  }
};

export const getAuthorPosts = async (author : string, reqCount : number, batch : number) => {
  if(reqCount <= 0){
    reqCount = 1;
  }
  try {
    const posts = await blogModel.find({ author: author }).skip(reqCount).sort('-createdAt').limit(batch);
    return new Response(200, SUCCESS_GET, posts);
  } catch (error) {
    return new Response(500, FAIL_POST, error);
  }
};

export const getLatestPosts = async (reqCount : number, batch : number) => {
  if(reqCount <= 0){
    reqCount = 1;
  }
  try {
    // skipping to choose those not yet fetched, without it gets the same 10 posts
    const skip = (reqCount-1)*batch;
    const latestPosts = await blogModel
      .find()
      .skip(skip)
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order to get the latest posts
      .limit(batch) // Limit the number of results to the specified count
      .exec();

    return new Response(200, SUCCESS_GET, latestPosts);
  } catch (e : any) {
    console.log(e.code === 11000);
    return new Response(500, FAIL_POST, e);
  }
};

export const likePost = async (author : string, postID : string) =>{
    try{
        const post = await blogModel.findOne({ postID: postID });
        if (post) {
        await post.updateLikes(author);                 
        }
        return new Response(200, SUCCESS_GET, true);
    }catch(e){
        console.log(e);
        return new Response(500, FAIL_POST, e);
    }

};

export const createUser = async(username: string, email: string, author : string, img: string, TMSTAMP: any) => {
  try {

    //first see if exists, reply with user details if so
    const user = await userModel.findOne({email:email}) || await userModel.create({
      username,
      email,
      author,
      img,
      TMSTAMP
    })
    return new Response(200, SUCCESS_POST, user)
  } catch (error : any) {
    return new Response(500, FAIL_POST, error)
  }
}

export const Username = async (username: string)=>{
  return await userModel.findOne({username:username})
}
