const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');
const mongoose = require('mongoose');
const app = express();

//VIEW ENGINE
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//middleware
app.use(express.urlencoded({extended:false}));


//routing
app.use('/user',userRouter);
app.get('/',(req,res)=>{
     return res.render('home');
});


//connection
mongoose.connect("mongodb://127.0.0.1:27017/blogify")
.then(()=>console.log("mongod connected"))
.catch((err)=>console.log(err));

const PORT =8000;
app.listen(PORT,()=>console.log(`server started at PORT=${PORT}`));