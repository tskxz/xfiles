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
		const {name, size, encoding, md5, mimetype} = req.files.xfile
		const {uploadedFilePath} = req.body

		const newFile = new xFile({
			name, size, encoding, md5, mimetype, filepath: uploadedFilePath
		})

		const savedFile = await newFile.save();
		res.redirect('/xfiles')

	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

module.exports = {
	getxFiles,
	storeFile
}