const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const { title, category, body, image } = req.body;

    if (!title || !category || !body) {
      return res
        .status(400)
        .json({ message: "Title, category, and body are required" });
    }

    const post = new Post({ title, category, body, image });
   
 if (image) {
   // Basic validation for Base64 string
   if (image.startsWith("data:image")) {
     post.image = image;
   } else {
     return res.status(400).json({ error: "Invalid image format" });
   }
 }
  const savedPost = await post.save();   
 res.status(201).json(savedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    // Add full URL to image paths
    const postsWithImageUrls = posts.map((post) => ({
      ...post._doc,
      image: post.image
        ? `${req.protocol}://${req.get("host")}${post.image}`
        : null,
    }));

    res.status(200).json(postsWithImageUrls);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching posts",
      error: error.message,
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Add full URL to the image path
    const postWithImageUrl = {
      ...post._doc,
      image: post.image
        ? `${req.protocol}://${req.get("host")}${post.image}`
        : null,
    };

    res.status(200).json(postWithImageUrl);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// UPDATE a post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, body } = req.body;

    const updateData = { title, category, body };

    // Check if new image was uploaded
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Post.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Return the updated post with full image URL
    const updatedWithImageUrl = {
      ...updated._doc,
      image: updated.image
        ? `${req.protocol}://${req.get("host")}${updated.image}`
        : null,
    };

    res.status(200).json(updatedWithImageUrl);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update post",
      error: error.message,
    });
  }
};
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Post.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete post", error: error.message });
  }
};