const express = require("express")
const xFile = require("../models/xfileModel")
const xFileController = require("../controllers/xfileController")
const {getxFiles, storeFile} = require("../controllers/xfileController")

const router = express.Router()

router.get('/', getxFiles)
router.post('/', storeFile)

module.exports = router