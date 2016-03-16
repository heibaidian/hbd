var mongoose = require('mongoose');
var db=require('../config/database').db;

var Schema = mongoose.Schema;
// Define User schema 
var _module = new Schema({
	moduleTitle: String,
	module:String,
	url:String
});
// export them
var collectionName = 'module';
exports.Module = db.model('Module', _module,collectionName);