var tel = require('../model/tel').Tel,
	telDao = {};

telDao.go = function(req, res) {
	tel.find({},function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.render('tel',{list:docs});
		}
	})
};

telDao.create = function(req, res, data) {
	console.log(data);
	tel.create(data, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	})
};

telDao.findall = function(req, res) {
	tel.find({}, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

telDao.findById = function(req, res, id) {
	tel.findById(id, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

telDao.findByIdAndRemove = function(req, res, id) {
	tel.findByIdAndRemove(id, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

telDao.findByIdAndUpdate = function(req, res,data) {
	tel.findByIdAndUpdate(data._id, data, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

telDao.distinct = function(req, res, data) {
	tel.distinct("cate", function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

telDao.distinct2 = function(req, res, data) {
	tel.distinct("area", function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

telDao.limit = function(req, res,pagesize,start) {
	if(typeof(start)== 'undefined')
		start=0;
	if(typeof(pagesize)== 'undefined')
		pagesize=18;
	tel.find().skip(start*pagesize).limit(pagesize).exec(function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			tel.count({},function(err,data){
				var page=parseInt(data/pagesize);
				if(data%pagesize>0)
					page++
				console.log({'page':page});
				var pageinfo=[];
				for(var i=1;i<=page;i++){
					var oj={};
					oj.url=pagesize+"/"+(i-1);
					oj.title=i;
					console.log({'url':oj.url,'title':oj.title});
					pageinfo.push(oj);
				}
				res.send({'list':docs,'pageinfo':pageinfo});
			});
		}
	})
};


exports.telDao = telDao;