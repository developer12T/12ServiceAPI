const http = require('http')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config()
require('dotenv').config()
const server = http.createServer(app)

const { API_PORT } = process.env
const port = process.env.port || API_PORT


server.listen(port,()=>{
    console.log(`server is running ${API_PORT}`)
})