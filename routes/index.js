const express = require('express')
const router = express.Router()

router.use('/', require('./home'))
router.use('/restaurants', require('./restaurants'))
router.use('/users', require('./users.js'))

module.exports = router
