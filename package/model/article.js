var mongoose = require('mongoose');
var db=require('../config/database').db;

var Schema = mongoose.Schema;
// Define User schema 
var _article = new Schema({
	title: String,
	content:String,
	desc:String,
	date:{ type: Date, default: Date.now },
	imgSrc:String
});
// export them
var collectionName = 'article';
exports.Article = db.model('Article', _article,collectionName);