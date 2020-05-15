require('dotenv').config();
const express = require('express')
const app = express()
// router
const userRoute = require("./routes/user.route")
const cookieParser = require("cookie-parser")
// auth Route
const authRoute = require("./routes/auth.route")

let authMiddleWare = require("./middleware/auth.middleware")

//use
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// cookie parser
app.use(cookieParser(process.env.SESSION_SECRET));

// template engine
app.set('view engine', 'pug')
app.set('views', './views')

// execute
app.get('/', function (req, res) {
  res.render('index');
})

app.use(express.static('public'))
// login
app.use('/auth', authRoute)
// user list
app.use('/users', authMiddleWare.requireAuth, userRoute);

app.listen(3000)