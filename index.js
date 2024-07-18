// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res) => {
  const dt = new Date();
  res.json({
      "unix": dt.valueOf(),
      "utc": dt.toUTCString()
  });
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  let dt;
  if (!date) {
    dt = new Date();
  } else {
    if (/^\d+$/.test(date)) {
      // If the date is a number (timestamp)
      dt = new Date(parseInt(date));
    } else {
      // If the date is a string (ISO format)
      dt = new Date(date);
    }
  }

  if (isNaN(dt.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
      "unix": dt.valueOf(),
      "utc": dt.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
