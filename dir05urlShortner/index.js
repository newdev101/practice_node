const express = require('express');
const connectToDb = require('./connection');
const path = require('path');

const cookieparser = require('cookie-parser');
const {restrictToLoggedInUserOnly, findUserByUid} = require('./middlewares/auth');

const urlRouter  = require('./routes/url');
const homeRouter = require('./routes/home');
const analyzeRouter = require('./routes/analyze');
const userRouter = require('./routes/user')
const PORT = 8001;
const app = express();




//connect to db
connectToDb('mongodb://127.0.0.1:27017/short_url3');

//ejs
app.set('view engine', 'ejs');
app.set('views',path.resolve('./views')); 
// ‼️ mast required

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser());





//routes
app.use('/user',userRouter);
app.use('/url', restrictToLoggedInUserOnly,urlRouter);
app.use('/analyze', restrictToLoggedInUserOnly,analyzeRouter);
app.use('/',findUserByUid,homeRouter);


//starting the server
app.listen(PORT,()=>console.log(`server started at PORT=${PORT}`));