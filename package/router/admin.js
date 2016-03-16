var express = require('express');
var router = express.Router();
var adminDao = require('../dao/adminDao').adminDao;

/* GET home page. */
router.get('/', function(req, res, next) {
	adminDao.load(req, res);
});

module.exports = router;