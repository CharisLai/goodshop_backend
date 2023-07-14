// Include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')

const routes = require('./routes')

const app = express()
// Define server related variables
const PORT = process.env.PORT || 3000

const SESSION_SECRET = 'secret'

app.engine('hbs', exphbs.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize()) // passport init
app.use(passport.session()) // session
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages') // 設定 success_msg 訊息
  res.locals.error_messages = req.flash('error_messages') // 設定 warning_msg 訊息
  next()
})

app.use(routes)

// Start and listen the server
app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})

module.exports = app
