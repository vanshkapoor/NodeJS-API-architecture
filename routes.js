const express = require("express")
const router = express.Router()

let controller = require('./controller')

router.get('/check', controller.auth.user.check)

module.exports = router