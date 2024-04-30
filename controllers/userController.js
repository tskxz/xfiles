const User = require("../models/userModel")

// Funcao para mostrar todos os utilizadores
const getUsers = async (req, res) => {
	try {
		const users = await User.find({})
		res.status(200).json(users)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

// Funcao para criar utilizador
const createUser = async(req, res ) => {
	try {
		const user = await User.create(req.body)
		res.status(200).json(user)
	} catch (error) {
		res.status(500).json({message: error.messsage})
	}
}

module.exports = {getUsers, createUser}