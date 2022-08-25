const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const route = require('./Routers/routes');
const PORT = 3001

app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', route);


mongoose.connect(process.env.CONNECT_MONGODB, { useNewUrlParser: true })

    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.log(`${err.message}`))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

