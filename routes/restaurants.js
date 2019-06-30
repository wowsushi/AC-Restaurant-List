const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')


router.get('/new', (req, res) => {
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
    rating: req.body.rating
  })

  restaurant.save(err => {
    if (err) return console.log(err)
    return res.redirect('/')
  })

})

router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    return res.render('show', { restaurant: restaurant })
  })
})

router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    return res.render('edit', {
      restaurant: restaurant,
    })
  })
})

router.put('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
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
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.remove(err => {
      return res.redirect('/')
    })
  })
})

module.exports = router
