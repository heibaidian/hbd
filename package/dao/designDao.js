var design = require('../model/design').Design,
	designDao = {};

designDao.go = function(req, res) {
	design.find({},function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.render('design',{'list':docs});
		}
	})
};

designDao.create = function(req, res, data) {
	design.create(data, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	})
};

designDao.findall = function(req, res) {
	design.find({}, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

designDao.findById = function(req, res, id) {
	design.findById(id, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

designDao.findPicUrlById = function(req, res, id) {
	design.find({'stylemore._id':id},{'stylemore._id.$':1}, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

designDao.findByIdAndRemove = function(req, res, id) {
	design.findByIdAndRemove(id, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

designDao.findByIdAndUpdate = function(req, res, data) {
	design.findByIdAndUpdate(data._id, data, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

designDao.updateStylemorebypush = function(req, res, data,id) {
	design.update({'_id':id},{$push:{'stylemore':data}}, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

designDao.updateStylemorebypull = function(req, res, data,id) {
	design.update({'_id':id},{$pull:{'stylemore':{'_id':data._id}}}, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

designDao.updateptitlebypush = function(req, res, data,id) {
	console.log(data);
	design.update({'stylemore._id':id},{$set:{'stylemore.$.ptitle':data.ptitle}}, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

designDao.updatepicurlbypush = function(req, res, data,id){
	design.update({'stylemore._id':id},{$push:{'stylemore.$.picurl':{'imgSrc':data.imgSrc}}}, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			console.log(docs)
			res.send(docs);
		}
	});
};

designDao.updatepicurlbypull = function(req, res, data,id) {
	design.findOne({'stylemore._id':id},{'stylemore.$':1}, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			var s=docs.stylemore[0].picurl;
			for (var i=0;i<s.length;i++){
				if(s[i]._id==data.d){
					s.pull(s[i]);
				}
			}
			design.findOneAndUpdate({'stylemore._id':id},{$set:{'stylemore.$.picurl':s}},function(err, docs) {
				if (err) {
					console.log('Error: ', err);
				} else {
					console.log(docs)
					res.send(docs);
				}
			});
		}
	});
};

exports.designDao = designDao;