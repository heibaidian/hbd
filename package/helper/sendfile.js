var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/upload', function(req, res, next) {
      var inputFile = req.body;
      var files = [];
      if (inputFile instanceof Array) {
        files = inputFile;
      } else {
        files.push(inputFile);
      }
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var filename = new Date().getTime() + file.name.substring(file.name.lastIndexOf('.'));
        
        var dstPath = './public/files/' + filename;
        var base64Data = file.data.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        //重命名为真实文件名
        fs.writeFile(dstPath, dataBuffer , function(err) {
          if (err) {
            console.log('rename error: ' + err);
          } else {
            res.send('/files/'+filename);
          }
        });
      }
});

module.exports = router;