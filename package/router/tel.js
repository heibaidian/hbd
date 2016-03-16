var express = require('express');
var router = express.Router();
var telDao = require('../dao/telDao').telDao;

/* GET home page. */
router.get('/', function(req, res, next) {
	telDao.go(req, res);
});

router.get('/find', function(req, res, next) {
	telDao.findall(req, res);
})

router.get('/del/:id', function(req, res, next) {
	telDao.findByIdAndRemove(req, res, req.params.id);
})

router.post('/update/:id', function(req, res, next) {
	console.log(req.body);
	telDao.findByIdAndUpdate(req,res,req.body);
})

router.get('/find/:id', function(req, res, next) {
	telDao.findById(req, res,req.params.id);
})

router.get('/tlp/find/:id', function(req, res, next) {
	telDao.findTlpById(req, res,req.params.id);
})

router.post('/create', function(req, res, next) {
	telDao.create(req, res,req.body);
});

router.get('/distinct', function(req, res, next) {
	telDao.distinct(req, res);
});

router.get('/distinct2', function(req, res, next) {
	telDao.distinct2(req, res);
});

router.get('/find/limit/:pagesize/:start', function(req, res, next) {
	telDao.limit(req, res,req.params.pagesize,req.params.start);
});

module.exports = router;