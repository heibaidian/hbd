var express = require('express');
var router = express.Router();
var classesDao = require('../dao/classesDao').classesDao;

/* GET home page. */
router.get('/', function(req, res, next) {
	classesDao.go(req, res);
});

router.get('/del/:id', function(req, res, next) {
	classesDao.findByIdAndRemove(req, res, req.params.id);
})

router.post('/update/:id', function(req, res, next) {
	classesDao.findByIdAndUpdate(req,res,req.body);
})

router.get('/find/:id', function(req, res, next) {
	classesDao.findById(req, res,req.params.id);
})

router.post('/create', function(req, res, next) {
	classesDao.create(req, res,req.body);
});

module.exports = router;