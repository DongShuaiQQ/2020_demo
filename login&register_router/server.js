const express = require('express');

let app = express();
//禁止服务器返回X-powered-by,为了安全
app.disable('x-powered-by');

//使用内置中间件暴露静态资源,不访问路由直接写文件名+后缀也能看页面
app.use(express.static(__dirname+'/public'))

//引入db模块 用于连接数据库
const db = require('./db/db');
const ejs = require('ejs')

//引用ejs
app.set('views',"views");	//设置视图的对应目录
app.set("view engine","ejs");		//设置默认的模板引擎
app.engine('ejs', ejs.__express);		//定义模板引擎


/* app.set('view engine','ejs');
app.set('views','./views');
 */
//使用内置中间件解析post请求的urlencoded参数
app.use(express.urlencoded({extended:true}));
//引入UI路由器
const UIRouter = require('./router/UIRouter');
//引入登录注册路由器
const loginRegisterRouter = require('./router/loginRegisterRouter');

db(()=>{
    //使用UIRouter
    app.use(UIRouter());
    //使用loginRegisterRouter
    app.use(loginRegisterRouter());
//绑定端口监听
app.listen(3000,function(err){
    if(err){
        console.log(err);
    }else{
        console.log('running....')
    }
})
},(err)=>{
    console.log('数据路连接失败',err);
})
