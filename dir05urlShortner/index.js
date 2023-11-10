const express = require('express');
const connectToDb = require('./connection');


const urlRouter  = require('./routes/url');
const homeRouter = require('./routes/home');
const analyzeRouter = require('./routes/analyze');
const PORT = 8001;
const app = express();




//connect to db
connectToDb('mongodb://127.0.0.1:27017/short_url2');

//middleware
app.use(express.json());

//routes
app.use('/url',urlRouter);
app.use('/analyze',analyzeRouter);
app.use('/',homeRouter);


//starting the server
app.listen(PORT,()=>console.log(`server started at PORT=${PORT}`));