const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
    email: { type: 'string', required: true},
    name: {type: 'string', required: true},
    message: {type: 'string', required: true},
    subject: {type: 'string', required: true},
    query: {type: 'string', required: true}
}, {timestamp: true})

module.exports = mongoose.model('Contact', contactSchema)