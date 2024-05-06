const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const UserController = require("../controllers/userController")

// Função para registar uma conta de utilizador
const signup = async(req, res) => {
	try{
		// Verifica se já existe um utilizador com esse username
		// Se ainda não existir uma conta com esse username
		// Cria conta
		const user_exists = await User.find({username: req.body.username})

		// Manda um erro a dizer que o utilizador já existe
		if(user_exists.length){
			req.flash("error", "User already exists!")
			res.redirect("/auth/signup")
		} else {
			const user = await User.create(req.body)
			console.log(user)
			console.log(user.username)
			req.session.loggedIn = true
			req.session.username = user.username
			res.redirect('/xfiles')
		}
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

// Função para autenticar numa conta de utilizador
const signin = async(req, res) => {
	try {
		const user = await User.find({username: req.body.username})
		if(user.length){
			if(await bcrypt.compare(req.body.password, user[0].password)){
				req.session.loggedIn = true
				req.session.username = user[0].username
				res.redirect('/xfiles')
			} else {
				// Se a password estiver errada, mostra a mensagem
				req.flash("error", "Given password is wrong.")
				res.redirect('/auth/signin')
			}
		} else {
			req.flash("error", "User not found!")
			res.redirect("/auth/signin")
		}
	} catch(error) {
		res.status(500).json({message: error.message})
	}
}

module.exports = {signup, signin}