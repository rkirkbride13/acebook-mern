const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  _id: { type: Number, default: 1 },
  lastModified: { type: Number },
  lastModifiedDate: { type: Date },
  name: { type: String },
  size: { type: Number },
  type: { type: String },
});

const PostSchema = new mongoose.Schema(
  {
    message: { type: String },
    likes: { type: Array, default: [] },
    photo: { type: FileSchema },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
