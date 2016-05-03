var material = require('../model/material').Material,
	materialDao = {};
	
materialDao.go = function(req, res) {
	material.find({},function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.render('material');
		}
	});
};

materialDao.create = function(req, res, data) {
	material.create(data, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	})
};

materialDao.findall = function(req, res) {
	material.find().populate('classes', 'name').exec(function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

materialDao.findById = function(req, res, id) {
	material.findById(id, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			console.log(docs);
			res.send(docs);
		}
	});
};

materialDao.findTlpById = function(req, res, id) {
	material.findById(id, function(err, docs1) {
		if (err) {
			console.log('Error: ', err);
		} else {
			var next={},
				pre={},
				data=docs1;
			material.find().gt('_id',docs1._id).sort({'_id': 1 }).limit(1).exec(function(err, docs2){
				if (err) {
					console.log('Error: ', err);
				} else {
					next=typeof(docs2[0])== 'undefined'?'':docs2[0];
					material.find().lt('_id',docs1._id).sort({_id: -1 }).limit(1).exec(function(err, docs3){
						if (err) {
							console.log('Error: ', err);
						} else {
							pre=typeof(docs3[0])== 'undefined'?'':docs3[0];
							console.log({'data':data,'pre':pre,'next':next});
							res.render('content2',{'data':data,'pre':pre,'next':next});
						}
					});
				}
			});
		}
	});
};

materialDao.findByIdAndRemove = function(req, res, id) {
	material.findByIdAndRemove(id, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

materialDao.findByIdAndUpdate = function(req, res, data) {
	material.findByIdAndUpdate(data._id , data, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

materialDao.distinct = function(req, res, data) {
	material.distinct("cate", function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

materialDao.limit = function(req, res,pagesize,start) {
	if(typeof(start)== 'undefined')
		start=0;
	if(typeof(pagesize)== 'undefined')
		pagesize=18;
	material.find().skip(start*pagesize).limit(pagesize).exec(function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			material.count({},function(err,data){
				var page=parseInt(data/pagesize);
				if(data%pagesize>0)
					page++
				var pageinfo=[];
				for(var i=1;i<=page;i++){
					var oj={};
					oj.url=pagesize+"/"+(i-1);
					oj.title=i;
					pageinfo.push(oj);
				}
				console.log({'list':docs,'pageinfo':pageinfo});
				res.send({'list':docs,'pageinfo':pageinfo});
			});
		}
	})
};

exports.materialDao = materialDao;