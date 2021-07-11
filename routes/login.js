const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/loginController');
const LoginControllerInstance = new LoginController();

router.post("/", LoginControllerInstance.login);

module.exports = router;