const express = require("express")
const User = require("../models/userModel")
const UserController = require("../controllers/userController")
const {getUsers, createUser} = require("../controllers/userController")

const router = express.Router()

router.get('/', getUsers)
router.post('/', createUser)

module.exports = router