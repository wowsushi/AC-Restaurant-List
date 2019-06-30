const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    res.render('index', { restaurants: restaurants })
  })
})

module.exports = router
