const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');

const app = express();

const PORT = 8000;


// Database Connection
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Database Connected")).catch((err)=>console.log("Database Not Connected",err))

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));



app.use('/',authRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}..`);
});

