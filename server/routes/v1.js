const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/UserController');

router.post('/users/signin', UserController.signIn);
router.post('/users/signup', UserController.signUp);

module.exports = router;