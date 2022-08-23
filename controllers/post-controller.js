const Post = require("../models/post");
const createPath = require("../helpers/create-path");
const handleError = (res, err) => {
  res.render(createPath("error"), { title: "Error " });
};

const getPost = (req, res) => {
  const title = "POST";
  Post.findById(req.params.id)
    .then((post) => res.render(createPath("post"), { post, title }))
    .catch((err) => handleError(res, err));
};

const deletePost = (req, res) => {
  const title = "POST";
  Post.findByIdAndDelete(req.params.id)
    .then((result) => res.sendStatus(200))
    .catch((err) => handleError(res, err));
};

const getEditPost = (req, res) => {
  const title = "EDIT POST";
  Post.findById(req.params.id)
    .then((post) => res.render(createPath("edit-post"), { post, title }))
    .catch((err) => handleError(res, err));
};
const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { title, author, text })
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((err) => handleError(res, err));
};
const getPosts = (req, res) => {
  const title = "POSTS";
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.render(createPath("posts"), { posts, title }))
    .catch((err) => handleError(res, err));
};

const addPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({
    title,
    author,
    text,
  });
  post
    .save()
    .then((result) => res.redirect("/posts"))
    .catch((err) => handleError(res, err));
};
const getAddPost = (req, res) => {
  const title = "Add post";
  res.render(createPath("add-post"), { title });
};
module.exports = {
  getPost,
  deletePost,
  getEditPost,
  editPost,
  getPosts,
  addPost,
  getAddPost,
};
