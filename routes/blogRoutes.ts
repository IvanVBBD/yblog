// src/routes.ts
import express, { Request, Response } from 'express';
import {postCommentControl, getPostsForAuthors, getLatestFeed, createPostControl, likePostControl} from "../Controllers/blogController"
import bodyParser from "body-parser"
const blogRouter = express.Router();


//body parser configs
blogRouter.use(bodyParser.json());
blogRouter.use(bodyParser.urlencoded({
  extended: true 
}));
const urlencodedParser = bodyParser.urlencoded({
  extended: false 
});

//Outcomes
const OK = 200;
const ERR = 500;
const DENIED = 403;
const BATCH = 10;

blogRouter.post('/', urlencodedParser, async (req : Request, res: Response) => {
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
blogRouter.post('/comment', urlencodedParser, async (req : Request, res: Response) => {
    const { text, author, username, postID } = req.body;
  
    try {
      //Response object
      const updatedPost = await postCommentControl(author,username, postID, text);

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
  const author = req.query.author? req.query.author.toString() : "";
  const reqCount = req.query.reqCount ? parseInt(req.query.reqCount.toString()) : 10;
  try {
    const posts = await getPostsForAuthors(author, reqCount, BATCH);
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

blogRouter.post('/like', urlencodedParser, async (req : Request, res : Response) =>{
    try{
        const {author, postID} = req.body;
        console.log("we got here!!!");
        const result = await likePostControl(author,postID);
        res.status(200).json(result);
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Error liking user posts' });
    }

})

export default blogRouter;