const express = require("express")
const xFile = require("../models/xfileModel")
const xFileController = require("../controllers/xfileController")
const {getxFiles} = require("../controllers/xfileController")

const router = express.Router()

router.get('/', getxFiles)

module.exports = router