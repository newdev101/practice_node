const URL = require("../models/url");

//RENDER HOME PAGE

// REDIRECT
async function handleRedirectUrl(req, res) {
  console.log(`new redirect request =${req.url}`);
  if(req.url=="/favicon.ico") return res.end();
  const shortId = req.params.id;
  console.log(`redirect req with id = ${shortId}`);

 
  try {
    const url = await URL.findOneAndUpdate(
      { shortId: shortId },
      {
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

    console.log(url.redirectUrl);

    // Concatenation of http in the url if it doesn't have any protocol
    const redirectUrl =
      url.redirectUrl.startsWith("http://") ||
      url.redirectUrl.startsWith("https://")
        ? url.redirectUrl
        : `http://${url.redirectUrl}`;

    console.log(`you are redirected to ${url.redirectUrl}`);
    return res.redirect(redirectUrl);
  } catch (error) {
    console.error("Error handling redirect:", error);
    return res.status(500).json({ status: "internal server error" });
  }
}


module.exports = {
  handleRedirectUrl,
};
