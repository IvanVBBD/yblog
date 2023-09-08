// src/routes.ts
import express, { Request, Response } from 'express';
import {postCommentControl, getPostsForAuthors, getLatestFeed, createPostControl, likePostControl, likeCommentControl} from "../Controllers/blogController"
import bodyParser from "body-parser"
import { verifyJwtSignature } from "../Controllers/authController";
const blogRouter = express.Router();


//body parser configs
blogRouter.use(bodyParser.json());
blogRouter.use(bodyParser.urlencoded({
  extended: true 
}));
const urlencodedParser = bodyParser.urlencoded({
  extended: false 
});

blogRouter.use(urlencodedParser);

//Outcomes
const OK = 200;
const ERR = 500;
const DENIED = 403;
const BATCH = 10;

blogRouter.post('/', verifyJwtSignature , async (req : Request, res: Response) => {
    const { title, username, content, author } = req.body;
    const currentTime = new Date();
  
    try {
      //Response object
      const createdPost = await createPostControl(author, username, content, title, currentTime);
      //can use the data part of the object with the message in order to send the id and the message for the FE component
      if(createdPost.status == OK){
        //can send data back from response object if we need to
        res.status(OK).send(createdPost.message);
      }
      else if(createdPost.status == ERR){
        res.status(ERR).send(createdPost.message);
      }
      else{
        res.status(DENIED).send("Sorry Neh, you failed to can")
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating post' });
    }
  });

  // Add a comment to a post
blogRouter.post('/comment', verifyJwtSignature , async (req : Request, res: Response) => {
    const { text, author, username, postID } = req.body;
  
    try {
      //Response object
      const updatedPost = await postCommentControl(author,username, text, postID);

      if(updatedPost.status == OK){
        //can send data back from response object if we need to
        res.status(OK).send(updatedPost.message);
      }
      else if(updatedPost.status == ERR){
        res.status(ERR).send(updatedPost.message);
      }
      else{
        res.status(DENIED).send("Sorry Neh, you failed to can")
      }
    } catch (error) {
      console.error(error);
      res.status(ERR).json({ message: 'Error adding comment' });
    }
  });
  
  // Get a user's blog posts with comments
blogRouter.get('/', urlencodedParser, async (req : Request, res: Response) => {
  const username = req.query.username? req.query.username.toString() : "";
  const reqCount = req.query.reqCount ? parseInt(req.query.reqCount.toString()) : 10;
  try {
    const posts = await getPostsForAuthors(username, reqCount, BATCH);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user posts' });
  }
});

blogRouter.get('/latest', urlencodedParser, async (req : Request, res: Response) => {
    const reqCount = req.query.reqCount ? parseInt(req.query.reqCount.toString()) : 10;

  try {
    const posts = await getLatestFeed(reqCount, BATCH);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user posts' });
  }
});

blogRouter.post('/like', verifyJwtSignature , async (req : Request, res : Response) =>{
    try{
        const {username, postID} = req.body;
        const result = await likePostControl(username,postID);
        res.status(200).json(result);
    }catch(e){
        res.status(500).json({ error: 'Error liking user posts' });
    }

})

blogRouter.post("/comment/like", verifyJwtSignature, async (req : Request, res : Response) => {
    try{
        const {username, commentID} = req.body;
        const result = await likeCommentControl(username,commentID);
        res.status(200).json(result);
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Error liking user posts' });
    } 
})

export default blogRouter;