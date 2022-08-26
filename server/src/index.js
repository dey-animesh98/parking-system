const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
const route = require('./Routers/routes');
const PORT = process.env.PORT || 3001

app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', route);


mongoose.connect("mongodb+srv://animesh-dey98:99YMUC4CD06Inl2W@cluster0.vhmqo.mongodb.net/parking-system-db", { useNewUrlParser: true })

    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.log(`${err.message}`))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

