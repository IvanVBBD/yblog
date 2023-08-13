const express = require("express");
const blogController = require("../Controllers/blogController");
const blogRouter = express.Router();
const bodyParser = require('body-parser')

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

blogRouter.post('/', urlencodedParser, async (req, res) => {
    const { title, content, author } = req.body;
    const currentTime = new Date();
  
    try {
      //Response object
      const createdPost = await blogController.createPost(author, content, title, currentTime);
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
blogRouter.post('/comment', urlencodedParser, async (req, res) => {
    const { text, author, postID } = req.body;
  
    try {
      //Response object
      const updatedPost = await blogController.postComment(author, postID, text);

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
blogRouter.get('/', urlencodedParser, async (req, res) => {
  const author = req.query.author;
  try {
    const posts = await blogController.getPostsForAuthors(author);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user posts' });
  }
});

blogRouter.get('/lastest', urlencodedParser, async (req, res) => {
  const count = req.query.count;
  try {
    const posts = await blogController.getLatestFeed(count);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user posts' });
  }
});


module.exports = blogRouter;
