const URL = require('../models/url');



// home page
async function handleStaticHome(req, res) {
     console.log("the home request");
   
     let urls = null;
   
     if (req.user) {
       // If req.user exists, find all URLs for the user
       urls = await URL.find({ createdBy: req.user._id });
     }
   
     return res.render('home', {
       urls: urls,
     });
   }
   

//signup page
async function handleStaticSignup(req,res){
     console.log("the signup request");
     return res.render('signup');
}

//signin page
async function handleStaticLogin(req,res){
     console.log("the signin request");
     return res.render('login');
}



module.exports={
     handleStaticHome,
     handleStaticSignup,
     handleStaticLogin
}