const express = require("express");
const router = express.Router();
const {
  getPost,
  deletePost,
  editPost,
  getPosts,
  addPost,
} = require("../controllers/api-post-controller");

// get All posts
router.get("/api/posts", getPosts);
// add new Post
router.post("/api/post", addPost);
// edit Post
router.put("/api/edit/:id", editPost);
// delete post by id
router.delete("/api/post/:id", deletePost);
// get post by id
router.get("/api/post/:id", getPost);

module.exports = router;
