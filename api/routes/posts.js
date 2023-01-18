const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.get("/user", PostsController.FindByUser);
router.get("/:id", PostsController.Find);
router.post("/", PostsController.Create);
router.patch("/:id", PostsController.Update);
// DELETE a post
router.delete("/", PostsController.Delete);

module.exports = router;
