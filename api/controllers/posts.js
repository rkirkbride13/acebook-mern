const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

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
    Post.findOne({_id: req.params.id})
    .then(() => {
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ user_id: user_id, posts: posts, token: token });
    }).catch(error => {
      res.status(400).json({ error })
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
  Update: async (req, res) => {
    try {
      if (!req.body.liked) {
        await Post.updateOne({_id: req.params.id}, 
          { $addToSet: { likes: req.body.user_id } })
      } else {
        await Post.updateOne({_id: req.params.id}, 
          { $pull: { likes: req.body.user_id } })
      }
      res.status(200).json({ message: "OK"})
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
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
