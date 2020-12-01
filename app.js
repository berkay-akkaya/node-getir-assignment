const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')
const app = express()

//configure body-parser for req body
app.use(bodyParser.json())

//Import routes 
const homeRoutes = require('./src/routes/home')

//Define routing
app.use('/', homeRoutes)

//DB connection using mongoose package
mongoose.connect(process.env.DB_CONNECTION, 
    {useNewUrlParser: true, useUnifiedTopology: true },
    (error) => {
    if(error){
        return console.log({message: error});
    }
    console.log('DB connection established');
})

//Activate port 3000
const port = 3000;
app.listen(port, (error) => {
    if(error){
        return console.log({message: error});
    }
    console.log('Listening the port on 3000')
})

//export app for jest testing
module.exports = app