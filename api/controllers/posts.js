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
  PostLikes: (req, res) => {
    Post.updateOne({_id: req.params.id}, 
      { $addToSet: { likes: req.body.user_id } }
    ).then(() => res.status(200).json({ message: "OK"}))
      .catch(error => {
        res.status(400).json({ error })
      })
  }
};

module.exports = PostsController;
