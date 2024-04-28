const xFile = require("../models/xfileModel")

// Funcao para mostrar todos os ficheiros existentes na base de dados
const getxFiles = async (req, res) => {
	try {
		const xFiles = await xFile.find({})
		res.status(200).json(xFiles)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

const storeFile = async(req, res) => {
	try {
		const xFile_ = await xFile.create(req.body)
		res.status(200).json(xFile_)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

module.exports = {
	getxFiles,
	storeFile
}