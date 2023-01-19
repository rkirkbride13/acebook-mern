const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.patch("/", UsersController.Update);
router.get("/", UsersController.Find);

module.exports = router;
