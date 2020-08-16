const mongoose = require("mongoose");

 //3.1:请来一个看门的保安  -----  引入模式对象
 let Schema = mongoose.Schema;
 //3.2:制定进入别墅的规则  ------- 创建约束对象
 //email,nick_Name,password,re_password
 let useRule = new Schema({
    email:{
         type:String,//限制学号必须为:字符串
         required:true,//限制学号为必填项
         unique:true,//限制学号是唯一的
     },
     nick_Name:{
         type:String,//限制名字必须为:字符串
         required:true,//限制名字为必填项
     },
     password:{
         type:Number,//限制年龄必须为:整数
         required:true,//限制学号为必填项
     },
     re_password:{
         type:Number,//限制性别必须为:字符串
         required:true,//限制性别为必填项
     },
     date:{
         type:Date,
         default:Date.now()
     },
     //有效表示: Y/N :通常用于逻辑删除
     enable_flag:{
         type:String,
         default:'Y',
     }
 });
 //3.3:告诉保安规则    ---------  创建模型对象
 module.exports = mongoose.model('users',useRule);//用于生成某个集合所对应模型对象
