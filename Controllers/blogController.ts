import { postComment, createPost, getAuthorPosts, getLatestPosts } from "./dbControl";
import crypto from 'crypto';
import Response from "../Tools/Response"

const ERR = 'There was an issue, please try again later'
const BATCH_SIZE = 10;

export const postCommentControl = async (author : string,text : string, postID : string) => {
  try {
    const response = await postComment(author,postID,text);
    return response;
  } catch (error) {
    console.log(error);
    return new Response(500, ERR, error) 
  }
}

export const createPostControl = async (author : string,content : string,title : string, time :any) => {
  try {
    const postID = generateUniqueId(author,content,title,time);
    const response = await createPost(author,content,title,time,postID);
    return response;
  } catch (error) {
    console.log(error);
    return new Response(500, ERR, error) 
  }
}

export const getPostsForAuthors = async (author : string, reqCount : number, batch :number) => {
  try {
    const response = await getAuthorPosts(author, reqCount, batch);
    return response;
  } catch (error) {
    console.log(error);
    return new Response(500, ERR, error) 
  }
}

export const getLatestFeed = async (reqCount : number, batch : number) => {
  try {
    const response = await getLatestPosts(reqCount, batch);
    return response;
  } catch (error) {
    console.log(error);
    return new Response(500, ERR, error) 
  }
}


export function generateUniqueId(author : string, content : string, title : string , time : any) {
  const data = author + content + title + time.toString();
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return hash;
}