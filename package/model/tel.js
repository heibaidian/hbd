var mongoose = require('mongoose');
var db=require('../config/database').db;

var Schema = mongoose.Schema;
// Define User schema 
var _tel = new Schema({
	title: String,
	star:{type:Number,min:0,max:5},
	imgSrc:String,
	tel:Number,
	cate:String,
	area:String
});
// export them
var collectionName = 'tel';
exports.Tel = db.model('Tel', _tel,collectionName);