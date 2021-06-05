import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  ide: String,
  deskripsi: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String, //convert image ke string pake base64
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostIde = mongoose.model("PostIde", postSchema);

export default PostIde;
