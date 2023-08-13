const db = require("./dbControl");
const crypto = require('crypto');
const Response = require('../Tools/Response')

const ERR = 'There was an issue, please try again later'

const postComment = async (author,text,postID) => {
  try {
    const response = await db.postComment(author,postID,text);
    return response;
  } catch (error) {
    console.log(error);
    return new Response(500, ERR, error) 
  }
}

const createPost = async (author,content,title,time) => {
  try {
    const postID = generateUniqueId(author,content,title,time);
    const response = await db.createPost(author,content,title,time,postID);
    return response;
  } catch (error) {
    console.log(error);
    return new Response(500, ERR, error) 
  }
}

const getPostsForAuthors = async (author, reqCount, batch) => {
  try {
    const response = await db.getAuthorPosts(author, reqCount, batch);
    return response;
  } catch (error) {
    console.log(error);
    return new Response(500, ERR, error) 
  }
}

const getLatestFeed = async (reqCount, batch) => {
  try {
    const response = await db.getLatestPosts(reqCount, batch);
    return response;
  } catch (error) {
    console.log(error);
    return new Response(500, ERR, error) 
  }
}


function generateUniqueId(author, content, title , time) {
  const data = author + content + title + time.toString();
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return hash;
}


module.exports = {postComment, createPost, getPostsForAuthors, getLatestFeed}