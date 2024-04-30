const User = require("../models/userModel")
const UserController = require("../controllers/userController")

// Função para registar uma conta de utilizador
const signup = async(req, res) => {
	try{
		// Verifica se já existe um utilizador com esse username
		// Se ainda não existir uma conta com esse username
		// Cria conta
		const user_exists = await User.find({username: req.body.username})
		if(user_exists.length){
			res.status(500).json({message: "User already exists."})
		} else {
			const user = await User.create(req.body)
			res.status(200).json(user)
		}
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

// Função para autenticar numa conta de utilizador
const signin = async(req, res) => {
	
}
module.exports = {signup, signin}