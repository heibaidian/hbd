var express = require('express');
var router = express.Router();
var moduleDao = require('../dao/moduleDao').moduleDao;

/* GET home page. */
router.get('/', function(req, res, next) {
	moduleDao.go(req, res);
});

router.get('/find', function(req, res, next) {
	moduleDao.findall(req, res);
})

router.get('/del/:id', function(req, res, next) {
	moduleDao.findByIdAndRemove(req, res, req.params.id);
})

router.get('/update/:id', function(req, res, next) {
	moduleDao.findByIdAndUpdate(req,res,req.params.id,{});
})

router.get('/find/:id', function(req, res, next) {
	moduleDao.findById(req, res,req.params.id);
})

router.get('/create', function(req, res, next) {
	moduleDao.create(req, res);
});

module.exports = router;