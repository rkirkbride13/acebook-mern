const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
// Import middleware Multer for uploading pictures
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const filefilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
let upload = multer({ storage, filefilter });

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
  Create:
    (upload.single("photo"),
    (req, res) => {
      const message = req.body.message;
      const photo = req.file.filename;

      const postObject = {
        message,
        photo,
      }

      console.log(req);
      console.log(req.body);
      // const photo = req.file.filename;
      // console.log(req.file.filename);

      const post = new Post(postObject);
      // console.log(typeof post, post);
      post.save(async (err) => {
        if (err) {
          throw err;
        }

        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: "OK", token: token });
      });
    }),

    // Create:(req, res) => {
    //   const message = req.body.message;

    //   // console.log(req);
    //   // console.log(req.body.message);
    //   console.log(req.files);
    //   // const photo = req.file.filename;
    //   // console.log(req.file.filename);

    //   const post = new Post(message);
    //   // console.log(typeof post, post);
    //   post.save(async (err) => {
    //     if (err) {
    //       throw err;
    //     }

    //     const token = await TokenGenerator.jsonwebtoken(req.user_id);
    //     res.status(201).json({ message: "OK", token: token });
    //   });
    // },

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
