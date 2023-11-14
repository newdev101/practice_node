const express = require('express');
const URL = require('../models/url')
const {handleRedirectUrl} = require('../controllers/home')
const {handleStaticHome, handleStaticSignup,handleStaticLogin} = require('../controllers/static');

const router = express.Router();


router.get('/login',handleStaticLogin);
router.get('/signup',handleStaticSignup);
router.get('/:id',handleRedirectUrl);
router.get('/',handleStaticHome);

module.exports = router;