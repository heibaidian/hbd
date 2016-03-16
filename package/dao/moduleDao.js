var module = require('../model/module').Module,
	moduleDao = {};
	
moduleDao.go = function(req, res) {
	module.find({},function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.render('module',docs);
		}
	})
};

moduleDao.create = function(req, res, data) {
	module.create(data, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	})
};

moduleDao.findall = function(req, res) {
	module.find({}, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

moduleDao.findById = function(req, res, id) {
	module.findById(id, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

moduleDao.findByIdAndRemove = function(req, res, id) {
	module.findByIdAndRemove(id, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

moduleDao.findByIdAndUpdate = function(req, res, id, data) {
	module.findByIdAndUpdate(id, data, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

exports.moduleDao = moduleDao;