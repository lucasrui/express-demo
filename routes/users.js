var express = require('express');
var router = express.Router();

//引入mongoose模块  
var mongoose = require('mongoose');  
//引入自定义的数据库配置模块  
var config = require('../config');  
//创建数据库连接,参数是从config配置文件的json对象中获取的连接信息,即mongodb://localhost/TaskManager  
mongoose.connect(config.db.mongodb);

var db = mongoose.connection;  
//mongdb数据库连接错误的时候被调用  
db.on('error', console.error.bind(console, 'connection error:'));  
//数据库成功打开的时候被调用  
db.once('open', function callback () {  
    console.log('数据库连接成功!');  
}); 

//引入models文件夹下面的usermodel.js  
var usermodel = require('../models/usermodel');  
//User是models.js返回的实例,exports.User = mongoose.model("User",userSchema);  
var User = usermodel.User;  
  
  
/* GET users listing. */  
//添加  
router.get('/init',function(req,res) {  
    var user = new User({  
        name :'张三',  
        password :'123'  
    });  
    user.save(function (err) {  
        if (err) {  
            callback(err);  
        }  
    });  
    res.send('数据已插入');  
});  
  
  
//更新  
router.get('/update',function(req,res) {  
  User.findOneAndUpdate({name:'张三'},{$set: {name:'李四'}},function (err, user) {  
      if(err) {  
          callback(err);  
      }  
      res.send(user);  
  });  
});  
  
  
//查询  
router.get('/query', function(req, res) {  
    //查询user,以json格式返回到浏览器  
    User.find(function(err,doc) {  
        if(err) {  
            callback(err);  
        }  
        res.json(doc);  
    });  
});  
  
//模糊查询  
router.get('/query2', function(req, res) {  
    //查询user,以json格式返回到浏览器
    var query = {};
    query['name'] = new RegExp('张');
    User.find(query,function(err,doc) {  
        if(err) {  
            callback(err);  
        }  
        res.json(doc);  
    });  
}); 

//删除  
router.get('/delete', function(req, res) {  
    User.remove({name:'张三'},function(err,doc) {  
        if(err) {  
            callback(err);  
        }  
        //输出删除的条数  
        console.log(doc);  
        res.end();  
    });  
});  
  
  
module.exports = router; 