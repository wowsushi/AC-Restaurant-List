const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost/restaurant', {useNewUrlParser: true})
const db = mongoose.connection

db.on('error', () => {
  console.log('db error!')
})

db.once('open', () => {
  console.log('db connected!')
})

const Restaurant = require('./models/restaurant.js')

app.get('/', (req, res) => {
  Restaurant.find((err, restaurant) => {
    if (err) return console.log(err)
    return res.render('index', { restaurants: restaurant })
  })
})

app.get('/restaurants/new', (req, res) => {
  const id = req.params.id
  const restaurant = restaurantList.results.find( restaurant => {
    return restaurant.id.toString() === id
  })

  res.render('show', { restaurant: restaurant })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurantList.results.find( restaurant => {
    return restaurant.id.toString() === id
  })

  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const matchedRestaurant = restaurantList.results.filter( restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: matchedRestaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
