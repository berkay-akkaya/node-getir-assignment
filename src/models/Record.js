const mongoose = require('mongoose')

//model for db collection [Record]
const recordSchema = mongoose.Schema({
    key: String,
    createdAt: Date,
    counts: [Number],
    value: String
})

module.exports = mongoose.model('Record', recordSchema)