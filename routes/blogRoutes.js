const express = require("express");
const blogController = require("../Controllers/blogController");
const blogRouter = express.Router();

blogRouter.get("/:author", async (req, res) => {
  const author = req.params.author;

  try {
    const posts = await BlogPost.find({ author }).sort("-createdAt");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user posts" });
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
blogRouter.post('/comments', async (req, res) => {
    const { text, author, postId } = req.body;
  
    try {
      const updatedPost = await BlogPost.findByIdAndUpdate(
        postId,
        {
          $push: { comments: { text, author } },
        },
        { new: true }
      );
  
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error adding comment' });
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
