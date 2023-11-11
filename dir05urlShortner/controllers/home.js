const URL = require("../models/url");



//RENDER HOME PAGE

// REDIRECT
async function handleRedirectUrl(req, res) {
  const shortId = req.params.id;
  console.log(`new redirect request with id=${shortId}`);
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
  
  if (!url) {
    console.log(`status: invalid url`);
    return res.status(401).json({ status: "invalid url" });
  }

  console.log(`you are redirected to ${url.redirectUrl}`);
  return res.redirect(url.redirectUrl);
}




module.exports = {
  handleRedirectUrl,
};
