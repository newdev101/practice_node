const URL = require('../models/url');

async function handleAnalyzeUrl(req,res){
     const shortId=req.params.id;
     const url = await URL.findOne({shortId:shortId});
     if(!url){
          console.log(`status: invalid url`);
          return res.status(401).jason({status:"invalid url"});
     }

     console.log(`totla clicks = ${url.visitHistory.length}`);
     return res.json({total_clicks:url.visitHistory.length});
}

module.exports={
     handleAnalyzeUrl,
}