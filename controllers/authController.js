const User = require("../models/userModel")

const signup = async(req, res) => {
	try{
		const user = await User.create(req.body)
		res.status(200).json(user)
		console.log(user)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}


module.exports = {signup}