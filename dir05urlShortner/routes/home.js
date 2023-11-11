const express = require('express');
const {handleRedirectUrl} = require('../controllers/home')
const {handleStaticHome} = require('../controllers/static');

const router = express.Router();

router.get('/:id',handleRedirectUrl);
router.get('/',handleStaticHome);

module.exports = router;