var express = require('express');
var router = express.Router();
var articleDao = require('../dao/articleDao').articleDao;

/* GET home page. */
router.get('/', function(req, res, next) {
	articleDao.go(req, res);
});

router.get('/find', function(req, res, next) {
	articleDao.findall(req, res);
})

router.get('/del/:id', function(req, res, next) {
	articleDao.findByIdAndRemove(req, res, req.params.id);
})

router.post('/update/:id', function(req, res, next) {
	articleDao.findByIdAndUpdate(req,res,req.body);
})

router.get('/find/:id', function(req, res, next) {
	articleDao.findById(req, res,req.params.id);
})

router.get('/tlp/find/:id', function(req, res, next) {
	articleDao.findTlpById(req, res,req.params.id);
})

router.post('/create', function(req, res, next) {
	articleDao.create(req, res,req.body);
});

router.get('/find/limit/:pagesize/:start', function(req, res, next) {
	articleDao.go(req, res,req.params.pagesize,req.params.start);
});

module.exports = router;