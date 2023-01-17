const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.get("/:id", PostsController.Find);
router.post("/", PostsController.Create);
router.patch("/:id", PostsController.PostLikes);

module.exports = router;
