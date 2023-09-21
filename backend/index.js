const express = require('express');
const dotenv = require('dotenv').config()
const cors = require('cors');
const { mongoose } = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express();



//database connection
try {
    mongoose.connect(process.env.MONGO_URL)
    console.log("Database Connected")
} catch (error) {
    console.log(error)
}

//middleware
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({extended:false}))


app.use('/', require('./routes/authRoutes'))

const port = 8000;
app.listen(port, () => console.log(`server is running on port ${port}`))