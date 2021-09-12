const express = require('express')
const flash = require('express-flash')
const ejs = require('ejs')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const Contact = require('./modal/contact')
const Message = require('./modal/message')
const moment = require('moment')

// Mongo Connection
const url = 'mongodb://localhost/contact_us'
mongoose.connect(url, { useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...')
}).on('error', () => {
    console.log('Connection failed...')
});



// Set template engine
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extend: false }))
app.use(express.json())
app.use(expressLayout)
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    return res.render('contact')
})


app.get('/table', async (req, res) => {
    const msg = await Contact.find(null,
        null, { sort: { 'createdAt': -1 } })
    res.header('Cache-Control', 'no-store')
    return res.render('table', { contact: msg, moment: moment})
})


app.post('/contact', (req, res) => {
    const {email, name, subject, message, query} = req.body;
    if(!email || !name || !subject || !message || !query) {
        return res.status(404).json({ message: 'All fields are required' });
            // return res.redirect('/')
    }
    const contact = new Contact({
        email: email,
        name: name,
        subject: subject,
        message: message,
        query: query
    })
    contact.save().then(contact => {
        // return res.send('We will contact you soon...')
        
        return res.redirect('/table')
    }).catch(err => {
        console.log('Something went wrong!!')
        return res.redirect('/')
    })


})


app.listen(3220, () => {
    console.log(`Listening on port 3220`)
    console.log('http://localhost:3220/');
})