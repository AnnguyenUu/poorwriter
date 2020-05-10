const express = require('express')
// controller
const controller = require("../controller/auth.controller")
// middleware
const validate = require("../validate/user.validate")
// router
let router = express.Router();

router.get('/login', controller.login)
router.post('/login', controller.postLogin)

module.exports = router;