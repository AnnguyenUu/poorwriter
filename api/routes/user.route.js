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
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/')
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({ storage: storage })

router.get('/', controller.index)

router.get('/create', controller.create)

router.post('/',
  upload.single('avatar'),
  controller.postCreate)

router.get('/:id', controller.get)

router.put('/:id', controller.update)

router.delete('/:id', controller.delete)

module.exports = router
