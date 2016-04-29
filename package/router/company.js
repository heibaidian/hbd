var express = require('express');
var router = express.Router();
var companyDao = require('../dao/companyDao').companyDao;

/* GET home page. */
router.get('/', function(req, res, next) {
	companyDao.go(req, res);
});

router.get('/find', function(req, res, next) {
	companyDao.findall(req, res);
})

router.get('/del/:id', function(req, res, next) {
	companyDao.findByIdAndRemove(req, res, req.params.id);
})

router.post('/update/:id', function(req, res, next) {
	companyDao.findByIdAndUpdate(req,res,req.body);
})

router.get('/find/:id', function(req, res, next) {
	companyDao.findById(req, res,req.params.id);
})

router.get('/tlp/find/:id', function(req, res, next) {
	companyDao.findTlpById(req, res,req.params.id);
})

router.post('/create', function(req, res, next) {
	companyDao.create(req, res,req.body);
});

router.get('/find/limit/:pagesize/:start', function(req, res, next) {
	companyDao.go(req, res,req.params.pagesize,req.params.start);
});

module.exports = router;