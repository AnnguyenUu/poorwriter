const express = require('express')

// router
let router = express.Router();

// lowdb
const db = require("../db")

// controller
const controller = require("../controller/user.controller")
// middleware
const validate = require("../validate/user.validate")
// middleware login
const authMiddleWare = require("../middleware/auth.middleware")

router.get('/', controller.index)


router.get('/cookie', function (req, res, next) {
  res.cookie('user-id', 12345);
  res.send('Cookie need milk');
})

// search
router.get('/search', controller.search)

//create
router.get('/create', controller.create)

// post
router.post('/create', validate.postCreate, controller.postCreate)

//get
router.get('/:id', controller.get)


module.exports = router
