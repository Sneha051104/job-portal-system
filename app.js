const express = require('express')
const app = express()

const web  = require('./routes/web')
const connectDb=require('./database/connectDb')
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport');
const cookieParser = require('cookie-parser')
require('dotenv').config();
const userSetInfo = require('./middleware/userSetInfo')

//token get cookies
app.use(cookieParser())
app.use(userSetInfo)

// messages
app.use(session({
    secret: 'secret',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false,
}));
// Flash messages
app.use(flash())

//view engine ejs
app.set('view engine', 'ejs')
//css image js link public
app.use(express.static('public'))

app.use(session({ secret: 'yourSecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//connect db
connectDb()


//data get from
app.use(express.urlencoded())




//route load
app.use('/',web)

//server star
app.listen(process.env.Port, () => {
  console.log(`server start localhost:${process.env.PORT}`)
})
