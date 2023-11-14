const URL = require("../models/url");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId();


//console.log(uid.rnd(6));
async function handleGenerateUrl(req, res) {
  console.log("new url request");
  const body = req.body;
  console.log(body);
  const shortId = uid.rnd(6);
  const url= await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    createdBy:req.user_id,
    visitHistory: [],
  });

  console.log(url);
  console.log("url created");
  // return res.json({new_url:`http://localhost:8001/${shortId}`});
  return res.redirect('/');
}

module.exports = {
  handleGenerateUrl,
};
