var module = require('../model/module').Module,
	indexDao = {};
	
indexDao.findall = function(req, res) {
	module.find({},function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.render('index',{'list':docs});
		}
	})
};

exports.indexDao = indexDao;