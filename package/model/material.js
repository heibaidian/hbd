var mongoose = require('mongoose');
var db=require('../config/database').db;

var Schema = mongoose.Schema;
// Define User schema 
var _material = new Schema({
	title: String,
	content:String,
	desc:String,
	date:{ type: Date, default: Date.now },
	star:{type:Number,min:1,max:5},
	imgSrc:String,
	cate:String
});
// export them
var collectionName = 'material';
exports.Material = db.model('Material', _material,collectionName);