import express from "express";
import mongoose from "mongoose";

import PostIde from "../models/postIde.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostIde.countDocuments({});
    const posts = await PostIde.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ deskripsi: error.deskripsi });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    //convert ke regular expression -> mudah untuk mongoDB,mongoose untuk cari di db//
    const ide = new RegExp(searchQuery, "i"); // i -> ignored case , test TEST Test -> same

    //communicate/find/cocokkan search query (judulide, tags) dengan yg ada di db schema PostIdes
    const posts = await PostIde.find({
      $or: [{ ide }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts }); //send response back ke front-end
  } catch (error) {
    res.status(404).json({ deskripsi: error.deskripsi });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostIde.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ deskripsi: error.deskripsi });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPostIde = new PostIde({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostIde.save();

    res.status(201).json(newPostIde);
  } catch (error) {
    res.status(409).json({ deskripsi: error.deskripsi });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { ide, deskripsi, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, ide, deskripsi, tags, selectedFile, _id: id };

  await PostIde.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostIde.findByIdAndRemove(id);

  res.json({ deskripsi: "Post berhasil didelete." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ deskripsi: "Unauthenticated" });
  }
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostIde.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostIde.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json(updatedPost);
};

export default router;
