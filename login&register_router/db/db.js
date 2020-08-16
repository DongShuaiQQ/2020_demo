
let mongoose = require("mongoose");

const DB_NAME = 'demo';
const PORT = 27017;
const IP = 'localhost';

function connectMongo(callback){
    mongoose.set('useCreateIndex', true)   //加上这个就可以

    //1.连接数据库
    mongoose.connect(`mongodb://${IP}:${PORT}/${DB_NAME}`,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });

    //2绑定数据库
    mongoose.connection.on('open',(err)=>{
        if(err){
            console.log('数据库连接失败',err);
            callback('connect failed');
        }else{
            console.log('数据库连接成功...');
            callback();
        }
    });

}
module.exports = connectMongo