const User = require("../models/userModel")
const bcrypt = require("bcrypt")

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

	// Tem que se melhorar nesta parte, mandar um aviso se o username já existir.
	try {
		const user = await User.create(req.body)
		res.status(200).json(user)
	} catch (error) {
		res.status(500).json({message: error.messsage})
	}
}

// Funcao para buscar um utilizador atraves do id
const getUserById = async(req, res) => {
	try{
		const user = await User.find({_id: req.params.id})
		res.status(200).json(user)
	} catch(error){
		res.status(500).json({message: error.message})
	}
}

// Funcao para buscar um utilizador atraves de username
const getUserByUsername = async(req, res) => {
	try{
		const user = await User.find({username: req.params.username})
		res.status(200).json(user)
	} catch(error){
		res.status(500).json({message: error.message})
	}
}

// Funcao para meter mudar informacoes do utilizador pelo id
const setUser = async(req, res) => {
	try {
		// Vai buscar as informações do utilizador que está autenticado
		const userAdmin = await User.findOne({ _id: req.session.userId });

		// Verifica se o utilizador que está autenticado é administrador
		// Se nao for, manda access denied, se for, faz a atualização
		if (!userAdmin || userAdmin.is_admin !== true){
			res.status(403).json({message: "Access denied"})
		} else {
			const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
			res.status(200).json(user)
		}
		
	} catch(error) {
		res.status(500).json({message: error.message})
	}
}

const signin = async(req, res) => {
	try {
		const user = await User.find({username: req.body.username})
		if(user.length){
			if(await bcrypt.compare(req.body.password, user[0].password)){
				req.session.loggedIn = true
				req.session.userId = user[0]._id.toString()
				req.session.username = user[0].username
				req.session.is_admin = user[0].is_admin
				res.status(200).json(user)
			} else {
				// Se a password estiver errada, mostra a mensagem
				res.status(500).json({message: "Given password is wrong!"})
			}
		} else {
			res.status(500).json({message: "User not found!"})
		}
	} catch(error) {
		res.status(500).json({message: error.message})
	}
}

module.exports = {getUsers, createUser, getUserById, getUserByUsername, setUser, signin}