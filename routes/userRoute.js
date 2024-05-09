const express = require("express")
const User = require("../models/userModel")
const UserController = require("../controllers/userController")
const {getUsers, createUser, getUserById, getUserByUsername, setUser, signin} = require("../controllers/userController")

const router = express.Router()

router.get('/', getUsers)
router.post('/', createUser)
router.get('/id/:id', getUserById)
router.get('/username/:username', getUserByUsername)
router.put('/:id', setUser)
router.post('/signin', signin)

module.exports = router