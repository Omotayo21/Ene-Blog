const express = require("express");
const {  getAllPosts, deletePost, getPostById } = require ("../controllers/postController.js");

const router = express.Router();
const Post = require("../models/postModel");

router.post("/create", async (req, res) => {
  try {
    const { title, category, body, image } = req.body;

    // Validate Base64 string
    if (image && !image.startsWith("data:image")) {
      return res.status(400).json({ error: "Invalid image format" });
    }

    const post = new Post({ title, category, body, image });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ 
      message: "Error creating post", 
      error: error.message 
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, category, body, image } = req.body;
    
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, category, body, image },
      { new: true }
    );
    
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ 
      message: "Error updating post", 
      error: error.message 
    });
  }
});
//router.post("/create", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
// Edit Post
//router.put('/:id', updatePost);

// Delete Post
router.delete('/:id', deletePost);


module.exports = router;
