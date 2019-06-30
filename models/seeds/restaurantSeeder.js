const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const RestaurantsSeed = require('./restaurant.json').results
const UsersSeed = require('./user.json').users

const Restaurant = require('../restaurant.js')
const User = require('../user.js')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error!')
})

db.once('open', () => {
  console.log('db connected!')

  UsersSeed.forEach((user, index) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err

        User.create({
          email: user.email,
          password: hash
        })
        .then(user => {
          const restaurants = index ? RestaurantsSeed.slice(3, 6) : RestaurantsSeed.slice(0, 3)

          restaurants.forEach(restaurant => {
            Restaurant.create({
              name: restaurant.name,
              name_en: restaurant.name_en,
              category: restaurant.category,
              image: restaurant.image,
              location: restaurant.location,
              phone: restaurant.phone,
              google_map: restaurant.google_map,
              rating: restaurant.rating,
              description: restaurant.description,
              userId: user._id
            })
          })
        })
      })
    })
  })

  console.log('done.')
})
