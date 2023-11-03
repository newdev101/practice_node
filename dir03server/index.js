const http = require("http");
const fs = require("fs");
const PORT = 8000;

const myServer = http.createServer((req, res) => {
  console.log("new req recived");
  var log = `\n${Date.now()} ${req.url}`;
  fs.appendFile("./log.txt", log, () => {
    switch (req.url) {
      case "/":
        res.end("welcome to home");
        break;

      case "/about":
        res.end("i am rajat");
        break;

      default:
        res.end("it 404 error");
        break;
    }
  });
});

myServer.listen(PORT, () => console.log(`server started at PORT=${PORT}`));
