const express = require("express");
const blogController = require("../Controllers/blogController");
const blogRouter = express.Router();

//Outcomes
const OK = 200;
const ERR = 500;
const DENIED = 403;


blogRouter.get("/:author", async (req, res) => {
  const author = req.params.author;

  try {
    
  } catch (error) {
    
  }
});

blogRouter.post('/', async (req, res) => {
    const { title, content, author } = req.body;
  
    try {
      const newPost = await BlogPost.create({
        title,
        content,
        author,
      });
  
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating post' });
    }
  });

  // Add a comment to a post
blogRouter.post('/comment', async (req, res) => {
    const { text, author, postId } = req.body;
  
    try {
      //Response object
      const updatedPost = await blogController.postComment(author, postId, text);
      
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
  blogRouter.get('/posts/:author', async (req, res) => {
    const author = req.params.author;
  
    try {
      const posts = await BlogPost.find({ author }).sort('-createdAt');
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching user posts' });
    }
  });


module.exports = blogRouter;
