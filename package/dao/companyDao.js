var company = require('../model/company').Company,
	companyDao = {};

companyDao.go = function(req, res,pagesize,start) {
	if(typeof(start)== 'undefined')
		start=0;
	if(typeof(pagesize)== 'undefined')
		pagesize=18;
	company.find().skip(start*pagesize).limit(pagesize).exec(function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			company.count({},function(err,data){
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
				res.render('company',{'list':docs,'pageinfo':pageinfo});
			});
		}
	})
};

companyDao.create = function(req, res, data) {
	company.create(data, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	})
};

companyDao.findall = function(req, res) {
	company.find({}, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

companyDao.findById = function(req, res, id) {
	company.findById(id, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

companyDao.findTlpById = function(req, res, id) {
	company.findById(id, function(err, docs1) {
		if (err) {
			console.log('Error: ', err);
		} else {
			var next={},
				pre={},
				data=docs1;
			company.find().gt('_id',docs1._id).sort({'_id': 1 }).limit(1).exec(function(err, docs2){
				if (err) {
					console.log('Error: ', err);
				} else {
					next=typeof(docs2[0])== 'undefined'?'':docs2[0];
					company.find().lt('_id',docs1._id).sort({_id: -1 }).limit(1).exec(function(err, docs3){
						if (err) {
							console.log('Error: ', err);
						} else {
							pre=typeof(docs3[0])== 'undefined'?'':docs3[0];
							console.log({'data':data,'pre':pre,'next':next});
							res.render('content',{'data':data,'pre':pre,'next':next});
						}
					});
				}
			});
		}
	});
};

companyDao.findByIdAndRemove = function(req, res, id) {
	company.findByIdAndRemove(id, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

companyDao.findByIdAndUpdate = function(req, res, data) {
	company.findByIdAndUpdate(data._id, data, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

exports.companyDao = companyDao;