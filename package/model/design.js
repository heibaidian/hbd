var mongoose = require('mongoose');
var db=require('../config/database').db;

var Schema = mongoose.Schema;
// Define User schema 
var _design = new Schema({
	mtitle:String,
	stylemore:[{
		ptitle:String,
		picurl:[{
			imgSrc:String
		}]
	}]
});
// export them
var collectionName = 'design';
exports.Design = db.model('Design', _design,collectionName);