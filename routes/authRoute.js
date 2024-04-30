const express = require("express")
const User = require("../models/userModel")
const authController = require("../controllers/authController")

const router = express.Router()

router.post('/signup', authController.signup)

module.exports = router