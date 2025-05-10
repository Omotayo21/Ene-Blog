const express = require("express");
const {  getAllPosts, deletePost, getPostById } = require ("../controllers/postController.js");

const router = express.Router();
const Post = require("../models/postModel");
const upload = require("../utils/upload");

// Create post with image upload
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { title, category, body } = req.body;

    if (!title || !category || !body) {
      return res.status(400).json({
        message: "Title, category, and body are required",
      });
    }

    const post = new Post({
      title,
      category,
      body,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({
      message: "Error creating post",
      error: error.message,
    });
  }
});

// Update post with image upload
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, category, body } = req.body;
    const updateData = { title, category, body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({
      message: "Error updating post",
      error: error.message,
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
