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
// Funcao para guardar info sobre o ficheiro na base de dados
const storeFile = async(req, res) => {
	try {
		// Extrair informacoese do ficheiro enviado
		const {name, size, encoding, md5, mimetype} = req.files.xfile
		const {uploadedFilePath} = req.body

		// Criar um novo documento xFile com as informacoes
		const newFile = new xFile({
			name, size, encoding, md5, mimetype, filepath: uploadedFilePath
		})

		// Guarda o documento do ficheiro na basee de dados
		const savedFile = await newFile.save();

		// Redireciona para a pagina
		res.redirect('/xfiles')

	} catch (error) {
		res.status(500).json({message: error.message})
	}
}

module.exports = {
	getxFiles,
	storeFile
}