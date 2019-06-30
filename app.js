const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost/restaurant', {useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error!')
})

db.once('open', () => {
  console.log('db connected!')
})

app.use(session({
  secret: 'foejfjowfif',
  resave: 'false',
  saveUninitialized: 'false'
}))
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

const Restaurant = require('./models/restaurant.js')

app.use('/', require('./routes/index'))

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
