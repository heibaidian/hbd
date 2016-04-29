var mongoose = require('mongoose');
var db=require('../config/database').db;

var Schema = mongoose.Schema;
// Define User schema 
var _company = new Schema({
	title: String,
	content:String,
	desc:String,
	date:{ type: Date, default: Date.now },
	star:{type:Number,min:1,max:5},
	imgSrc:String
});
// export them
var collectionName = 'company';
exports.Company = db.model('Company', _company,collectionName);