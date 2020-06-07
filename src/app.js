const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
const app = express()

const startpage = path.join(__dirname, '../public')
const partials = path.join(__dirname, '../partials')

app.set('view engine', 'hbs')
hbs.registerPartials(partials)
//app.set('views', filename var) will redirect to search for views in that directory.
app.use(express.static(startpage))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chazz'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Chazz',
        image: "./img/cake.jpg"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Chazz'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'No Address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if (error !== undefined) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, bata) => {
            if (error !== undefined) {
                return res.send({error})
            }
            res.send({
                address: req.query.address,
                place,
                forecast: bata,
                name: 'Chazz',
                temp: 23
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){

    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sarit',
        errorMessage: 'Help page not found.'
    })})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sarit',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log("started")
})