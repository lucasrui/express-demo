var express = require('express');
var utility = require('utility');

var router = express.Router();

router.get('/', function(req, res) {
  var q = req.query.q;
  if(q){
  	var md5Value = utility.md5(q);
	res.send(md5Value);
  }else{
  	res.send('wrong format');
  }
});

module.exports = router;