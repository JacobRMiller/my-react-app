const express = require('express');
const hbs = require('hbs');
const mongoconnect = require('./app/mongodb-connect.js');

var app = express();
var port = 3000;

app.set('view engine', 'hbs');

//use static file - but we don't have any of these. We will be using react.js for the UI and only the express project for API calls
//app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.send(
        { name : "JAKE" }
    );
});


app.listen(port);

mongoconnect.connect();

console.log("listening on port " + port);