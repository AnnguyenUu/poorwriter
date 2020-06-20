const express = require('express')
// controller
const controller = require("../controller/auth.controller")
// router
let router = express.Router();

router.get('/login', controller.login)
router.post('/login', controller.postLogin)

module.exports = router;