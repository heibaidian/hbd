var mongoose = require('mongoose');
var db=require('../config/database').db;

var Schema = mongoose.Schema;
// Define User schema 
var _classes = new Schema({
	name: String
});
// export them
var collectionName = 'classes';
exports.Classes = db.model('Classes', _classes,collectionName);