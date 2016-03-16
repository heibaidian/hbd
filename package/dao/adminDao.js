var module = require('../model/module').Module,
	adminDao = {};
	
adminDao.load = function(req, res) {
	module.find({},function(err, docs) {
		if (err) {
			console.log('Error: ', err);
		} else {
			res.render('admin/index',{'list':docs});
		}
	})
};

exports.adminDao = adminDao;