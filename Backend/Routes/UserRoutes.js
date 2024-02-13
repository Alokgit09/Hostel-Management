const express = require("express");

const { registerUser, loginUser } = require('../Controllers/SignupLoginuser');

const router = express.Router();

// Register user API ///

router.post('/register', registerUser);


// Login user API ///

router.post('/login', loginUser);


module.exports = router;