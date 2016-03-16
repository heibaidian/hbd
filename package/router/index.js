var express = require('express');
var router = express.Router();
var indexDao = require('../dao/indexDao').indexDao;

/* GET home page. */
router.get('/', function(req, res, next) {
	indexDao.findall(req, res);
});
router.get('/404', function(req, res, next) {
	res.render('404');
});

module.exports = router;