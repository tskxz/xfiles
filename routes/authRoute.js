const express = require("express")
const User = require("../models/userModel")
const authController = require("../controllers/authController")

const router = express.Router()

// Rotas para autenticação
router.post('/signup', authController.signup)
router.post('/signin', authController.signin)

// Rotas para renderizar as paginas
router.get('/signin', (req, res) => {
	if(req.session){
		res.redirect('/xfiles')
	} else {
		res.render('signin')
	}
	
})

router.get('/signup', (req, res) => {
	if(req.session){
		res.redirect('/xfiles')
	} else {
		res.render('signup')
	}
	
})
module.exports = router