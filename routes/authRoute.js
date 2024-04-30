const express = require("express")
const User = require("../models/userModel")
const authController = require("../controllers/authController")

const router = express.Router()

// Rotas para autenticação
router.post('/signup', authController.signup)
router.post('/signin', authController.signin)
router.get('/signin', (req, res) => {
	res.render('signin')
})
module.exports = router