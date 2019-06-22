const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.use('/', require('./routes/home'))
app.use('/search', require('./routes/search'))
app.use('/restaurants', require('./routes/restaurants'))


mongoose.connect('mongodb://localhost/restaurant', {useNewUrlParser: true})
const db = mongoose.connection

db.on('error', () => {
  console.log('db error!')
})

db.once('open', () => {
  console.log('db connected!')
})

const Restaurant = require('./models/restaurant.js')

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
