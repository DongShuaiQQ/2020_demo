//引入Router
const {Router} = require('express'); 

//创建一个路由器(路由器就是一个小型的app)
let router = new Router();
//引入模型对象
let userModel = require('../model/usersModel');
const { resolveInclude } = require('ejs');
//用于处理用户的登录请求,有很多业务逻辑(效验数组的有效性等)  ------ 业务路由
router.post('/login',(req,res)=>{
    //1.获取输入
    const {email,password} = req.body;
    //2.校验数据
    //效验邮件的正则表达式
   const emailReg = /^[a-zA-Z0-9_]{4,20}@[a-zA-Z0-9]{2,10}\.com$/;
   //效验密码是否合法
   const passWorldReg = /^[a-zA-Z0-9_@#.+&]{6,20}$/;
   //准备一个空对象用于手机错误信息
   const errMsg = {}
   if(!emailReg.test(email)){
        //res.send('邮箱和格式不合法,用户名必须是4-20为,主机名必须是2-10位');
        errMsg.emailErr = `邮箱和格式不合法,用户名必须是4-20为,主机名必须是2-10位`;
    }
    if(!passWorldReg.test(password)){
        //res.send('密码格式不正确,必须5-24位');
        errMsg.password = '密码格式不正确,必须5-24位';
    }
    if(JSON.stringify(errMsg) !== '{}'){
        res.render('login',{errMsg})
    }
    //3.去数据库中查找:
    userModel.findOne({email,password},(err,data)=>{
        if(err){
            console.log(err);
            errMsg.networkErr = '网络不稳定';
            res.reader('login',{errMsg});
            return;
        }
        if(data){
            res.redirect('http://www.baidu.com');
            return;
        }
        errMsg.loginErr = '用户名或秘密输入错入!';
        res.reader('login',{errMsg});
        //res.send('用户名或秘密输入错入!')
    })
})
//用于处理用户的注册请求,有很多业务逻辑(效验数组的有效性等)  ------ 业务路由
router.post('/register',(req,res)=>{
    //1.获取用户的输入
    const {email,nick_Name,password,re_password} = req.body;
    /*2.效验数据的合法性(一般是前后台同时效验) 
        2.1效验成功
            -去数据库中查找该邮箱的是否被注册过
            2.1.1:注册测过,提示用户邮箱已经注册测过
            2.1.2:未注册,写入数据库
        2.2效验失败
            -提示用户具体哪里输入不正确
    */
   //效验邮件的正则表达式
   const emailReg = /^[a-zA-Z0-9_]{4,20}@[a-zA-Z0-9]{2,10}\.com$/;
   //效验昵称是否合法/[\u4e00-\u9fa5]/gm
   const nickNameReg = /.*?/;
   //效验密码是否合法
   const passwordReg = /^[a-zA-Z0-9_@#.+&]{6,20}$/;
   console.log(nick_Name);

   const errMsg = {}
   //使用正则去比较
   if(!emailReg.test(email)){
       //res.send('邮箱和格式不合法,用户名必须是4-20为,主机名必须是2-10位');
       errMsg.emailErr = '邮箱和格式不合法,用户名必须是4-20为,主机名必须是2-10位'
   }if(!nickNameReg.test(nick_Name)){
       //res.send('昵称格式不合法,必须是中文名字');
       errMsg.nickErr = '昵称格式不合法,必须是中文名字'
   } if(!passwordReg.test(password)){
       //res.send('密码格式不正确,必须5-24位');
       errMsg.passwordErr = '密码格式不正确,必须5-24位';
   } if(password != re_password){
        //res.send('两次密码输入不一样')
        errMsg.rePassword = '两次密码输入不一样'
   }
   if(JSON.stringify(errMsg) !== '{}'){
       //若进入这里说明,输入错误,重新回到注册页面
        res.reader('register',{errMsg})       
   }else{
       //去数据库中查询该邮箱是否被注册过
       userModel.findOne({email}),function(err,data){
            if(data){
                //如果注册过
                //引入计数模块--当到一个明暗的阈值,触发安全机制
                console.log(`邮箱为${email}的用户注册失败,因为邮箱重复`);
                errMsg.emailErr = `${email}邮箱已经被注册过,请更换邮箱`
                res.reader('register',{errMsg});
            }else{
                //没有注册过
                userModel.create({email,nick_Name,password}),function(err,data){
                    if(!err){
                        //如果写入成功
                        res.redirect('/login');
                    }else{
                        //入股写入失败
                        //引入报警模块,当达到敏感阈值,触发报警
                        console.log(err);
                        errMsg.networkErr = `当前网络不稳定,请重新登录`;
                        res.reader('register',{errMsg});
                    }
                }
            }
       }
   }
})

module.exports = function(){
    return router;
}