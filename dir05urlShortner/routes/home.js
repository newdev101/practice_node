const express = require('express');
const {handleRedirectUrl} = require('../controllers/home')

const router = express.Router();

router.get('/:id',handleRedirectUrl);

module.exports = router;