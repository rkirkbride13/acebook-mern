const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    message: { type: String },
    likes: { type: Array, default: [] },
    photo: { type: Object },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
