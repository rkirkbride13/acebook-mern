const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
// Import middleware Multer for uploading pictures
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require('path')




const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts, user_id) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ user_id: user_id, posts: posts, token: token });
    });
  },
  Find: (req, res) => {
    Post.findOne({ _id: req.params.id })
      .then(() => {
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ user_id: user_id, posts: posts, token: token });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  },
  
    Create:(req, res) => {
      console.log(req.files, req.file)
      
      const message = req.body.message;
      const photo = req.file.filename;

      const postObject = {
        message,
        photo,
      }


      const post = new Post(postObject);
      
      post.save(async (err) => {
        if (err) {
          throw err;
        }

        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: "OK", token: token });
      });
    },

  PostLikes: (req, res) => {
    Post.updateOne(
      { _id: req.params.id },
      { $addToSet: { likes: req.body.user_id } }
    )
      .then(() => res.status(200).json({ message: "OK" }))
      .catch((error) => {
        res.status(400).json({ error });
      });
  },
  Delete: async (req, res) => {
    try {
      const post = await Post.findOneAndDelete({ _id: req.get("Post_ID") });
      const token = await TokenGenerator.jsonwebtoken(req.user_id);

      res.status(200).json({ message: "DELETED", token: token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = PostsController;
