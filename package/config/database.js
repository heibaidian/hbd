var mongoose=require('mongoose');
db = mongoose.createConnection('mongodb://127.0.0.1:27017/hbd'); 

db.on('error',function(error){
	consolo.log('Connection error',error);
});
db.on('open',function(){
   console.log('Connection open');
});
db.on('connected',function(){
   console.log('Success Connection');
});
db.on('disconnected',function(){
   console.log('Bye');
});

exports.db=db;