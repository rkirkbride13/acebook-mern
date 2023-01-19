const express = require("express");
const router = express.Router();

//Import BodyParser to convert JSON body and FormData body
const bodyParser = require('body-parser');


const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.get("/:id", PostsController.Find);
router.post("/", urlencodedParser, PostsController.Create);
router.patch("/:id", PostsController.PostLikes);
// DELETE a post
router.delete("/", PostsController.Delete);

module.exports = router;
