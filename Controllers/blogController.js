const db = require("./dbControl");
const Response = require('../Tools/Response')

const ERR = 'There was an issue, please try again later'

const postComment = async (author,postID,text) => {
  try {
    const response = await db.postComment(author,postID,text);
    return response;
  } catch (error) {
    return new Response(500, ERR, error) 
  }
}

const createPost = async (author,postID,text) => {
  try {
    const response = await db.createPost(author,postID,text);
    return response;
  } catch (error) {
    return new Response(500, ERR, error) 
  }
}

module.exports = {postComment, createPost}