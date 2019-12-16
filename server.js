// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

//#1 for empty date string
app.get("/api/timestamp", (req, res) => {
  var date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

//#2 for .. else
app.get("/api/timestamp/:date", (req, res) => {
  var param = req.params.date;
  
  var numbers = /^[0-9]+$/;
  if (param.match(numbers)){
    var unix = parseInt(param);
    var date = new Date(unix);
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  } else {

      var date = new Date(param);
    
      if(date.getTime() > 0){
        res.json({ unix: date.getTime(), utc: date.toUTCString() });
      }else{
        res.json({error: "Invalid Date"});
      }
      //res.json({ unix: date.getTime(), utc: date.toUTCString() });
    
      
    
  }
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
