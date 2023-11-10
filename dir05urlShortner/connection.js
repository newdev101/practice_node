const mongoose = require('mongoose');

async function connectToDb(url){
     return mongoose
     .connect(url)
     .then(()=>console.log("mongod connected"))
     .catch((err)=>console.log(err));
}

module.exports=connectToDb;