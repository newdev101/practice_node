const USER = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const {setUser,getUser} = require('../services/auth');

//RENDER HOME PAGE

// REDIRECT
async function handleUserSignup(req, res) {
     const {name,email,password} = req.body;
     const user = await USER.create({name, email, password});

     //setting the cookie for the user
     const sessionId=uuidv4();
     setUser(sessionId,user);
     res.cookie("uid",sessionId);

     return res.redirect('/');
}
async function handleUserLogin(req, res) {
     const {email,password} = req.body;
     const user = await USER.findOne({email,password});
     if(!user) return res.redirect('/login');


     //setting the cookie for user
     const sessionId=uuidv4();
     setUser(sessionId,user);
     res.cookie("uid",sessionId);

     return res.redirect('/');
}

module.exports = {
     handleUserSignup,
     handleUserLogin,
};
