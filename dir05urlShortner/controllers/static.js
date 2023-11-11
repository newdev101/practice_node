const URL = require('../models/url');


async function handleStaticHome(req,res){
     console.log("the home request");
     const urls =await URL.find({});
     return res.render('home',{
          urls:urls,
     });
}


module.exports={
     handleStaticHome,
}