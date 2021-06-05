import express from "express";

import {
  getPostsBySearch,
  getPosts,
  getPost,
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/search", getPostsBySearch); //search route
router.get("/", getPosts); //no auth midd, accessable oleh user/bukan user
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
