const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const csv = require('./csv-wrt')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/cards', async function(req, res) {
    const fetch = require('node-fetch')
    const page = req.query.page
    const url = `https://reqres.in/api/users?page=${page}`
    const fetch_res = await fetch(url)
    const cards = await fetch_res.json()

    csv(cards.data)

    res.render(path.join(__dirname+'/views/partials/cards.hbs'), {
        cards
    })
})


async function start() {
    try {
        app.listen(PORT, () => {
            console.log(`Server has been started with port: ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

