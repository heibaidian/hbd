var express = require('express');
var router = express.Router();
var materialDao = require('../dao/materialDao').materialDao;

/* GET home page. */
router.get('/', function(req, res, next) {
	materialDao.go(req, res);
});

router.get('/find', function(req, res, next) {
	materialDao.findall(req, res);
})

router.get('/del/:id', function(req, res, next) {
	materialDao.findByIdAndRemove(req, res, req.params.id);
})

router.post('/update/:id', function(req, res, next) {
	materialDao.findByIdAndUpdate(req,res,req.body);
})

router.get('/find/:id', function(req, res, next) {
	materialDao.findById(req, res,req.params.id);
})

router.get('/tlp/find/:id', function(req, res, next) {
	materialDao.findTlpById(req, res,req.params.id);
})

router.post('/create', function(req, res, next) {
	materialDao.create(req, res,req.body);
});

router.get('/distinct', function(req, res, next) {
	materialDao.distinct(req, res);
});

router.get('/find/limit/:pagesize/:start', function(req, res, next) {
	materialDao.limit(req, res,req.params.pagesize,req.params.start);
});

module.exports = router;