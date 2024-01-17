const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');

dotenv.config({path: './config.env'});

const app = express();

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() =>{
    console.log("Database Connected.");
}).catch((err) => console.log(err));

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true,
}));

app.use(express.json());
app.use(require('./routes/router'));

const PORT = process.env.PORT;

app.listen(PORT,function(){
    console.log(`Server is Running on Port ${PORT}...`);
});