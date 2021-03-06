const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')


router.get('/new', authenticated, (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image || 'https://www.lauriloewenberg.com/wp-content/uploads/2019/04/No_Image_Available.jpg',
    location: req.body.location,
    phone: req.body.phone,
    description: req.body.description,
    rating: req.body.rating,
    userId: req.user._id
  })

  restaurant.save(err => {
    if (err) return console.log(err)
    return res.redirect('/')
  })

})

router.get('/:id', authenticated, (req, res) => {
 console.log(req.params._id)
 console.log(req.user._id)
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.log(err)
    return res.render('show', { restaurant: restaurant })
  })
})

router.get('/:id/edit', authenticated, (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.log(err)
    return res.render('edit', {
      restaurant: restaurant,
    })
  })
})

router.put('/:id', (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.name = req.body.name,
    restaurant.category = req.body.category,
    restaurant.image = req.body.image,
    restaurant.location = req.body.location,
    restaurant.phone = req.body.phone,
    restaurant.description = req.body.description,
    restaurant.rating = req.body.rating

    restaurant.save(err => {
      if (err) return console.log(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

router.delete('/:id/delete', (req, res) => {
  Restaurant.findOne({ _id: req.params.id, userId: req.user._id }, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.remove(err => {
      return res.redirect('/')
    })
  })
})

module.exports = router
