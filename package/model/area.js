var mongoose = require('mongoose');
var db=require('../config/database').db;

var Schema = mongoose.Schema;
// Define User schema 
var _area = new Schema({
	id:Number,
	name:String,
	level:Number,
	upid:Number
});
// export them
var collectionName = 'area';
exports.Area = db.model('Area', _area,collectionName);