const express = require('express')
const dotenv = require('dotenv').config()
var cors = require('cors')
const {errorHandler} = require('./middleware/errorHandleMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', function(req, res) {
    res.json({message :'Welcome to Support Desk API'})
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(PORT, function()
{
    console.log(`Server up and running on port ${PORT} `);
})