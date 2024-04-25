const express = require("express")
const express_hbs = require("express-handlebars")
const app = express()
const port = 3000
const handlebars = express_hbs.create({extname: '.hbs'})
const fileUpload = require('express-fileupload')
const flash = require('express-flash')

// Usar o template handlebars
app.engine('hbs', handlebars.engine)
app.set('view engine', 'hbs')

// Servir os ficheiros estaticos na rota /xfiles
app.use('/xfiles', express.static('uploads'))

// Inicializar o fileUpload
app.use(fileUpload());

// Inicializa o flash para mandar aviso sem redirecionar
app.use(flash())

app.use((req, res, next) => {
	res.locals.message = req.flash()
	next();
})

// Teste de conexão
app.get("/ping", (req, res) => {
	res.send("pong!")
})

// Rota para ir dar upload aos ficheiros
app.get('/', (req, res) => {
	res.render('index')
})

// Faz o upload
app.post('/xfile', function(req, res) {
	let xFile
	let uploadPath

	// Verifica se nenhum ficheiro foi enviado
	if(!req.files || Object.keys(req.files).length===0){
		return res.status(400).send('No files were uploaded.')
	}

	// Obter o ficheiro
	xFile = req.files.xfile
	uploadPath = __dirname + '/uploads/' + xFile.name

	xFile.mv(uploadPath, function(err){
		if(err)
			return res.status(500).send(err)
		res.send('File uploaded.')
	})

})

// Rodar o servidor
app.listen(port, () => {
	console.log(`Running on port: ${port}`)
})