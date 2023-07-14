// Include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')

const app = express()
// Define server related variables
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.use(routes)

// Start and listen the server
app.listen(PORT, () => {
  console.log(`Express is running on http://localhost:${PORT}`)
})

module.exports = app
