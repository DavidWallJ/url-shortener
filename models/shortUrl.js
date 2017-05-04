/**
 * Created by david on 5/4/17.
 */
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var urlSchema = new Schema({
    originalUrl: String,
    shortenedUrl: String
}, {timestamp: true});

var Url = mongoose.model('shortUrl', urlSchema);

module.exports = Url;