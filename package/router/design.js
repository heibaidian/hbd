var express = require('express');
var router = express.Router();
var designDao = require('../dao/designDao').designDao;

/* GET home page. */
router.get('/', function(req, res, next) {
	designDao.go(req, res);
});

router.get('/find', function(req, res, next) {
	designDao.findall(req, res);
})

router.get('/del/:id', function(req, res, next) {
	designDao.findByIdAndRemove(req, res, req.params.id);
})

router.post('/update/:id', function(req, res, next) {
	designDao.findByIdAndUpdate(req,res,req.body);
})

router.post('/update/stylemore/push/:id', function(req, res, next) {
	designDao.updateStylemorebypush(req, res,req.body,req.params.id);
});

router.post('/update/stylemore/pull/:id', function(req, res, next) {
	designDao.updateStylemorebypull(req, res,req.body,req.params.id);
});

router.post('/update/stylemore/ptitle/:id', function(req, res, next) {
	designDao.updateptitlebypush(req, res,req.body,req.params.id);
});

router.post('/update/stylemore/picurl/push/:id', function(req, res, next) {
	designDao.updatepicurlbypush(req, res,req.body,req.params.id);
});

router.post('/update/stylemore/picurl/pull/:id', function(req, res, next) {
	designDao.updatepicurlbypull(req, res,req.body,req.params.id);
});

router.get('/find/:id', function(req, res, next) {
	designDao.findById(req, res,req.params.id);
})

router.get('/find/picurl/:id', function(req, res, next) {
	designDao.findPicUrlById(req, res,req.params.id);
})

router.post('/create', function(req, res, next) {
	designDao.create(req, res,req.body);
});

module.exports = router;