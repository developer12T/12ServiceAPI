const express = require('express')
const app = express() ;
const cors = require('cors')
app.use(express.json())

app.use(cors(
    {
        origin: 'http://localhost:5174', // Update to use 'localhost' instead of '127.0.0.1'
        credentials: true
    }));

const dataCn = require('./route/dataCn')

app.use('/dataCn',dataCn)


module.exports = app
