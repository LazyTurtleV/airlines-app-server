const cookieParser = require('cookie-parser');
const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/loginController');

router.use(cookieParser(LoginController._secretKey))

router.post("/", LoginController.login);
router.get("/", LoginController.isUserAuthorized)

module.exports = router;