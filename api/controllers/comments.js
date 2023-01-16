const Comment = require("../models/comment");
const TokenGenerator = require("../models/token_generator");

const CommentsController = {
  Create: (req, res) => {
    const {text, post_id} = req.body
    const comment = new Comment(text, req.user_id, post_id );
    comment.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
};

module.exports = CommentsController;