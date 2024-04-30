const User = require("../models/userModel")
const UserController = require("../controllers/userController")
const signup = async(req, res) => {
	try{
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

module.exports = {signup}