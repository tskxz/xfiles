const express = require("express")
const xFile = require("../models/xfileModel")
const xFileController = require("../controllers/xfileController")
const {getxFiles, storeFile, getImg} = require("../controllers/xfileController")

const router = express.Router()

router.get('/', getxFiles)
router.post('/', storeFile)
router.get('/:file', getImg)

module.exports = router