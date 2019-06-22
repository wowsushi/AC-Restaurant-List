const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

router.get('/', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find((err, restaurants) => {
    if (err) return console.log(err)
    const matchedRestaurant = restaurants.filter( restaurant => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurants: matchedRestaurant, keyword: keyword })
  })
})

module.exports = router
