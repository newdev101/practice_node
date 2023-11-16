const {Router} = require('express');
const User = require('../models/user');

const router = Router();




//home
// router.get('/',(req,res)=>{
//      return res.render('home');
// });


//signin
router.get('/signin',(req,res)=>{
     return res.render('signin');
});


//signup
router.get('/signup',(req,res)=>{
     return res.render('signup');
});


//signup post
router.post('/signup',async(req,res)=>{
     const {fullName, email, password} = req.body;
     console.log(fullName, email, password);
     await User.create({
          fullName,
          email,
          password,
     });
     return res.redirect('/user/signup');
});


//signin post
router.post('/signin',async(req,res)=>{
     const {email, password} = req.body;
     const user = User.matchPassword(email, password);
     console.log(user);

     return res.redirect('/user/signin');
});

module.exports=router;

