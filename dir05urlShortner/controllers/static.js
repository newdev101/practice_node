const URL = require('../models/url');


async function handleStaticHome(req,res){
     return res.render('home');
}


module.exports={
     handleStaticHome,
}