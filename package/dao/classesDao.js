var classes = require('../model/classes').Classes,
	classesDao = {};
	
classesDao.go = function(req, res) {
	classes.find({},function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	})
};

classesDao.create = function(req, res, data) {
	classes.create(data, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	})
};

classesDao.findById = function(req, res, id) {
	classes.findById(id, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

classesDao.findByIdAndRemove = function(req, res, id) {
	classes.findByIdAndRemove(id, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

classesDao.findByIdAndUpdate = function(req, res, data) {
	classes.findByIdAndUpdate(data._id, data, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

exports.classesDao = classesDao;