var article = require('../model/article').Article,
	articleDao = {};

articleDao.go = function(req, res,pagesize,start) {
	if(typeof(start)== 'undefined')
		start=0;
	if(typeof(pagesize)== 'undefined')
		pagesize=18;
	article.find().skip(start*pagesize).limit(pagesize).exec(function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			article.count({},function(err,data){
				var page=data/pagesize;
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
				res.render('article',{'list':docs,'pageinfo':pageinfo});
			});
		}
	})
};

articleDao.create = function(req, res, data) {
	article.create(data, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	})
};

articleDao.findall = function(req, res) {
	article.find({}, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

articleDao.findById = function(req, res, id) {
	article.findById(id, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

articleDao.findTlpById = function(req, res, id) {
	article.findById(id, function(err, docs1) {
		if (err) {
			console.log('Error: ', err);
		} else {
			var next={},
				pre={},
				data=docs1;
			article.find().gt('_id',docs1._id).sort({'_id': 1 }).limit(1).exec(function(err, docs2){
				if (err) {
					console.log('Error: ', err);
				} else {
					next=typeof(docs2[0])== 'undefined'?'':docs2[0];
					article.find().lt('_id',docs1._id).sort({_id: -1 }).limit(1).exec(function(err, docs3){
						if (err) {
							console.log('Error: ', err);
						} else {
							pre=typeof(docs3[0])== 'undefined'?'':docs3[0];
							console.log({'data':data,'pre':pre,'next':next});
							res.render('content3',{'data':data,'pre':pre,'next':next});
						}
					});
				}
			});
		}
	});
};

articleDao.findByIdAndRemove = function(req, res, id) {
	article.findByIdAndRemove(id, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

articleDao.findByIdAndUpdate = function(req, res, data) {
	article.findByIdAndUpdate(data._id, data, function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.send(docs);
		}
	});
};

exports.articleDao = articleDao;