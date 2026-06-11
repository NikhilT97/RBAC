const express = require("express");
const authRoutes = express.Router();
const { signup, login } = require("../Controller/auth.controller");

// signup -----------------------------------------

authRoutes.post("/signup", signup);

// login---------------------------------------
authRoutes.post("/login", login);


module.exports = authRoutes