require('dotenv').config();
const express = require('express')
const app = express()
// router
const userRoute = require("./routes/user.route")
const cookieParser = require("cookie-parser")
// auth Route
const authRoute = require("./routes/auth.route")
// mongo
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const paginate = require('express-paginate');
let apiUserRoute = require("./api/routes/user.route")
let authMiddleWare = require("./middleware/auth.middleware")

// over ride

const methodOverride = require('method-override')

//use
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//api
app.use('/api/users', apiUserRoute)
// cookie parser
app.use(cookieParser(process.env.SESSION_SECRET));

// use over ride 

app.use(methodOverride("_method"))

// template engine
app.set('view engine', 'pug')
app.set('views', './views')


app.use(paginate.middleware(10, 50));

// execute
app.get('/', function (req, res) {
  res.render('index');
})

app.use(express.static('public'))
// login
app.use('/auth', authRoute)
// user list
app.use('/users', authMiddleWare.requireAuth, apiUserRoute);

app.listen(3000)