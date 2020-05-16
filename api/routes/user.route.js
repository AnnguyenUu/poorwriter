const express = require('express')
// router
let router = express.Router();
// controller
const controller = require("../controllers/user.controller")
// middleware
const validate = require("../../validate/user.validate")
// middleware login
const authMiddleWare = require("../../middleware/auth.middleware")
// multer validate
let multer = require("multer")
let upload = multer({ dest: '../../public/uploads/' })

router.get('/', controller.index)

router.get('/create', controller.create)

router.post('/',
  upload.single('avatar'),
  controller.postCreate)

router.get('/:id', controller.get)

router.put('/:id', controller.update)

router.delete('/:id', controller.delete)

module.exports = router
