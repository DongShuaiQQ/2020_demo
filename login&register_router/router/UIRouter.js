
/* 
专门用于管理展示界面的UI路由
*/
//引入Router
const {Router} = require('express'); 
//创建一个路由器(路由器就是一个小型的app)
let router = new Router();
//引入path模块
//let path = require('path');
let {resolve} = require('path');


//用于展示登录界面的路由,无其他任何逻辑 ------UI路由
router.get('/login',(req,res)=>{
    //resolve(从哪里出发,查找规则)
    //let url = path.resolve(__dirname,'../public/login.html');
    let url = resolve(__dirname,'../public/login.html');
    res.sendFile(url);
})
//用于展示注册界面的路由,无其他任何逻辑 ------UI路由
router.get('/register',(req,res)=>{
    let url = resolve(__dirname,'../public/register.html')
    res.sendFile(url);
})

module.exports = function(){
    return router;
}
