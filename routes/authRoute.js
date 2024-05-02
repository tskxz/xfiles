const express = require("express")
const User = require("../models/userModel")
const authController = require("../controllers/authController")

const router = express.Router()

// Rotas para autenticação
router.post('/signup', authController.signup)
router.post('/signin', authController.signin)

// Rotas para renderizar as paginas
router.get('/signin', (req, res) => {
	if(!req.session.loggedIn){
		res.render('signin', {
			error: req.flash("error")
		})
	} else {
		res.redirect('/xfiles')
	}
	
})

router.get('/logout', (req, res) => {
	req.session.destroy()
	res.redirect('/auth/signin')
})

router.get('/signup', (req, res) => {
	if(!req.session.loggedIn){
		res.render('signup', {
			error: req.flash("error")
		})
	} else {
		res.redirect('/xfiles')
	}
	
})
module.exports = router