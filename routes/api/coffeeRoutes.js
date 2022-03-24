const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

// All Coffee
// localhost:3000
router.get('/', (req, res) => {
    const URL = 'https://api.sampleapis.com/coffee/hot'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/coffee', {
                title: 'All The Coffee',
                name: 'All The Hot Coffee',
                data
            })
        })
})

// Hot Coffee
router.get('/hot', (req, res) => {
    const URL = 'https://api.sampleapis.com/coffee/hot'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/coffee', {
                title: 'Hot Coffee',
                name: 'Hot Coffee',
                data
            })
        })
})

// Iced Coffee
router.get('/iced', (req, res) => {
    const URL = 'https://api.sampleapis.com/coffee/iced'
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            res.render('pages/cold-coffee', {
                title: 'Cold Coffee',
                name: 'Cold Coffee',
                data
            })
        })
})

// Single Coffee
// localhost:3000/coffee/:id
router.get('/:type/:id', (req, res) => {
    const type = req.params.type
    const id = req.params.id
    const URL = `https://api.sampleapis.com/coffee/${type}/${id}`
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            if (Object.keys(data).length >= 1) {
                res.render('pages/single-coffee', {
                    title: `${data.title}`,
                    name: `${data.title}`,
                    data
                })
            } else {
                res.render('pages/404', {
                    title: '404 Error - Grounds in the coffee, try again',
                    name: '404 Error - Grounds in the coffee, try again'
                })
            }
        })
        .catch(error => {
            console.log('ERROR', error)
        })
})

module.exports = router