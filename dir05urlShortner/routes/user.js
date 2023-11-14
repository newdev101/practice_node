const express = require('express');
const {handleUserSignup, handleUserLogin} = require('../controllers/user')

const router = express.Router();


//create new user
router.post('/auth',handleUserLogin);
router.post('/',handleUserSignup);

module.exports=router;