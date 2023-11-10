const express = require('express');
const {handleAnalyzeUrl} = require('../controllers/analyze')

const router = express.Router();
router.get('/:id',handleAnalyzeUrl);


module.exports=router;