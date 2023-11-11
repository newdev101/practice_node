const express = require('express');
const URL = require('../models/url')
const {handleRedirectUrl} = require('../controllers/home')
const {handleStaticHome} = require('../controllers/static');

const router = express.Router();

router.get('/',handleStaticHome);
router.get('/:id',handleRedirectUrl);

module.exports = router;