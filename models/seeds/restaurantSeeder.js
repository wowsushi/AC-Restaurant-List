const mongoose = require('mongoose')
const RestaurantsSeed = require('./restaurant.json').results
const Restaurant = require('../restaurant.js')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error!')
})

db.once('open', () => {
  console.log('db connected!')

  for (let i = 0; i < RestaurantsSeed.length; i++) {
    Restaurant.create({
      id: RestaurantsSeed[i].id,
      name: RestaurantsSeed[i].name,
      name_en: RestaurantsSeed[i].name_en,
      category: RestaurantsSeed[i].category,
      image: RestaurantsSeed[i].image,
      location: RestaurantsSeed[i].location,
      phone: RestaurantsSeed[i].phone,
      google_map: RestaurantsSeed[i].google_map,
      rating: RestaurantsSeed[i].rating,
      description: RestaurantsSeed[i].description
    })
  }

  console.log('done.')
})

