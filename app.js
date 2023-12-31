if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// Include packages and define server related variables
const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('./config/passport')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const { getUser } = require('./helpers/auth-helpers')

const { pages, apis } = require('./routes')

const app = express()
// Define server related variables
const PORT = process.env.PORT || 3000

const SESSION_SECRET = 'secret'

app.engine('hbs', exphbs.engine({ extname: '.hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(passport.initialize()) // passport init
app.use(passport.session()) // session
app.use(flash())
app.use(methodOverride('_method')) // method-override
app.use('/upload', express.static(path.join(__dirname, 'upload'))) // 上傳圖片
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages') // 設定 success_msg 訊息
  res.locals.error_messages = req.flash('error_messages') // 設定 warning_msg 訊息
  res.locals.user = getUser(req)
  next()
})

app.use('/api', apis)
app.use(pages)

// Start and listen the server
app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})

module.exports = app
