const express = require('express');
const app = express();
const fs = require('fs');
const port = 3200;

let rawdata = fs.readFileSync('items.json');  
let itemsData = JSON.parse(rawdata);

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.listen(port, () => {
   console.log("Server running on port 3200");
});
app.get('/items', function (req, res) {
    itemsData[itemsData.length - 1].to = new Date();
    res.send({items: itemsData})
  })