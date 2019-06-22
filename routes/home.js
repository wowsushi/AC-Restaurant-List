const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

router.get('/', (req, res) => {
  const sortBy = req.query
  Restaurant.find()
  .sort(sortBy)
  .exec((err, restaurants) => {
    if (err) return console.log(err)
    return res.render('index', { restaurants: restaurants })
  })
})

module.exports = router
