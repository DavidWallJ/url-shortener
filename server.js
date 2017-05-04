/**
* Created by david on 5/2/17.
*/
var express = require('express');
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());


var api = '/urlShortener';

app.get(api, function (req, res) {

});





if (PORT === 3000) {
    app.get('/urlShortener/', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    });
}


app.listen(PORT, function () {
console.log('Listening on port 3000!')
});