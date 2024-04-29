// Importar as configuracoes do ficheiro .env
require('dotenv').config()

const express = require("express")
const express_hbs = require("express-handlebars")
const app = express()
const port = 3000
const handlebars = express_hbs.create({extname: '.hbs'})
const fileUpload = require('express-fileupload')
const flash = require('express-flash')
const session = require('express-session')
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const mongoose = require('mongoose')
const xFileRoute = require("./routes/xfileRoute")
const {storeFile} = require("./controllers/xfileController")
// Usar o template handlebars
app.engine('hbs', handlebars.engine)
app.set('view engine', 'hbs')

// Servir os ficheiros estaticos na rota /xfiles
app.use('/xfiles', express.static('uploads'))

// Inicializar o fileUpload
app.use(fileUpload());

// Configuracao das middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(session({
	secret: "sh!",
	resave: false,
	saveUninitialized: false
}))

// Inicializa o flash para mandar aviso sem redirecionar
app.use(flash())

// Rotas
app.use("/api/xfiles", xFileRoute)

app.use((req, res, next) => {
	res.locals.message = req.flash()
	next();
})

// Teste de conexão
app.get("/ping", (req, res) => {
	res.send("pong!")
})

// Rota para ir dar upload aos ficheiros
app.get('/xfiles', (req, res) => {
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

	// Gera letras aleatorias e pega tambem na extensao do ficheiro
	random_letters = uuidv4().substring(0,5);
	file_extension = path.extname(xFile.name)

	xFile.name = random_letters + file_extension

	uploadPath = __dirname + '/uploads/' + xFile.name

	// Se for enviado, chama a funcao storefile para armazenar as informacoese sobre o ficheiro na base de dados
	xFile.mv(uploadPath, function(err){
		if(err) return res.status(500).send(err)
		req.body.uploadedFilePath = uploadPath
	storeFile(req, res);
	})

})

// Conectar a base de dados
mongoose.connect(process.env.DATABASE_STRING)
.then(() => {
	console.log("Conectado a base de dados")
	// Rodar o servidor
	app.listen(port, () => {
		console.log(`Running on port: ${port}`)
	})
})

