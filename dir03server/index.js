const express = require("express");
const app = express();
const PORT = 8000;


app.get("/",(req,res)=>{
  res.end("welcome to homepage");
});

app.get("/about",(req,res)=>{
  res.end("hi i am rajat");
});

app.listen(PORT,()=>console.log(`server started at PORT=${PORT}`));

// const myServer = http.createServer(app);
// myServer.listen(PORT, () => console.log(`server started at PORT=${PORT}`));
