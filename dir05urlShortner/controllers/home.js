const URL = require("../models/url");



//RENDER HOME PAGE

// REDIRECT
async function handleRedirectUrl(req, res) {
  console.log("new redirect request");
  console.log(req.params.id);
const shortId = req.params.id;
//   console.log(shortId);
//   console.log(`new redirect request with id=${shortId}`);
const url = await URL.findOneAndUpdate( 
 { shortId: shortId },
 {
   // pusing the object to the visithistory list
   $push: {
     visitHistory: {
       timestamp: Date.now(),
     },
   },
 }
);
console.log(url.redirectUrl);
const redirectUrl = url.redirectUrl.startsWith('http://') || url.redirectUrl.startsWith('https://')
? url.redirectUrl
: `http://${url.redirectUrl}`;

if (!url) {
 console.log(`status: invalid url`);
 return res.status(401).json({ status: "invalid url" });
}

console.log(`you are redirected to ${url.redirectUrl}`);
return res.redirect(redirectUrl);//it doesn't work without https
}




module.exports = {
  handleRedirectUrl,
};
