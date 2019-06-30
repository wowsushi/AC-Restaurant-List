const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')

const sortTypes = {
  name: {
    display: '餐廳名字'
  },
  category: {
    display: '餐廳類別'
  },
  location: {
    display: '餐廳地區'
  },
  rating: {
    display: '餐廳評分'
  }
}

router.get('/', authenticated, (req, res) => {
  const { searchTerm, direction = 'asc', sortBy = 'name' } = req.query
  const chTypeName = sortTypes[sortBy].display

  Restaurant.find({
    userId: req.user._id
  })
  .find({
    "name": {
      "$regex": new RegExp(searchTerm, 'i')
    }
  })
  .sort({ [sortBy]: direction })
  .exec((err, restaurants) => {
    res.render('index', { restaurants, searchTerm, direction, sortBy, sortTypes, chTypeName })
  })
})

module.exports = router
