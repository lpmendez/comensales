const express = require("express");
const port = process.env.PORT || 8081;
const app = express();
console.log(process.env.APIKEY);
console.log(process.env.PORT);
app.use(express.static(__dirname + "/dist"));
app.get(/.*/, function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});
app.listen(port);

console.log("Started server...");
