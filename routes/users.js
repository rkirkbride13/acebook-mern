var express = require('express');
var router = express.Router();

var UsersController = require('../controllers/Users');

router.get('/new', UsersController.New);
router.post('/', UsersController.Create);

module.exports = router;