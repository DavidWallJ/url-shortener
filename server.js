/**
* Created by david on 5/2/17.
*/
var express = require('express');
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");
var mongoose = require('mongoose');
var PORT = process.env.PORT || 3000;
var shortUrl = require("./models/shortUrl");


var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

MONGOLAB_URI="mongodb://DavidJWall:Meiguanxi8@ds127101.mlab.com:27101/url-shortener";

// connect to mongodb via mongoose
// first option is mongo on Heroku and the second is mongo locally
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/urlShortener');


var regex =/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

app.get('/urlShortener/new/:url(*)', function (req, res) {

    var urlToShorten = req.params.url;

    if(regex.test(urlToShorten) === true){
        var newShortUrl = Math.floor(Math.random()*1000000).toString();

        // lets create some before save middle ware to ensure that the random newShortUrl doesn't already exist.  if it does, make a new new one.

        var data = new shortUrl({
            originalUrl: urlToShorten,
            shortenedUrl: newShortUrl
        });

        data.save(function(err){
            if(err){
                return res.send('Error saving to database');
            }
        });

        return res.json(data);
    }

    return res.json({
        originalUrl: urlToShorten,
        shortenedUrl: "Invalid Entry"
    });


    // return res.json({url: urlToShorten});
});



app.get('/urlShortener/:url', function (req, res, next) {

    var url = req.params.url;

    shortUrl.findOne({shortenedUrl: url}, function(err, data){
       if(err){
           next(err);
           return res.send('Error reading database');
       } if(data) {
           res.redirect(301, 'http://' + data.originalUrl);
       } else {
           return res.send('No record exists for this shortened URL.');
        }
    });

});

var api = '/testing';

app.get(api, function (req, res) {
    res.json({"ipaddress": "testing" });
});

if (PORT === 3000) {
    app.get('/urlShortener/', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/index.html'));
    });
}


app.listen(PORT, function () {
console.log('Listening on port 3000!')
});