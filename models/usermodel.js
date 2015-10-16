var mongoose = require('mongoose');  
  
  
var Schema = mongoose.Schema;  
  
  
var userSchema = new Schema({  
    name:String,  
    password:String  
});  
//exports.User中的User是一个function  
exports.User = mongoose.model("User",userSchema);