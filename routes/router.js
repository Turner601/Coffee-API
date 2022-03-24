const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

router.use(express.static('public'))

const coffeeRoutes = require('./api/coffeeRoutes')

router.use('/coffee', coffeeRoutes)

// Home Route
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/coffee/hot'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/home', {
                title: 'My Coffee Page',
                name: 'Turners Coffee Home Page',
                data
            })
        })
})

router.get('*', (req, res) => {
    if (req.url == '/favicon.ico/') {
        res.end()
    } else {
        res.render('pages/404', {
            title: '404 Error - Machine is clogged',
            name: '404 Error - Machine is clogged'
        })
    }
})

module.exports = router