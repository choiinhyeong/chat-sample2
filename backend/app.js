// Setup basic express server
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const dotenv = require('dotenv');

const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')({
    path: '/websocket/chat',
    serveClient: false
});
const io2 = require('socket.io')({
    path: '/websocket/system',
    serveClient: false
});

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

io.attach(server)
io2.attach(server)

const redisStore  = require('socket.io-redis');
const redis = require('ioredis');
const port = 3000;

const mysql = require('mysql');
const dbConfig = require('./config/db_info')[process.env.SERVER];

const moment = require('moment');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


const pool = mysql.createPool(dbConfig);

console.log("process.env.SERVER : " , process.env.SERVER);

/**
 *  기존 레디스 관련
 */

// let redisClient = null;
// let redisStoreHost = null;
// let redisHost = 'pea-hrd-dev-redis.o88ccj.0001.apn2.cache.amazonaws.com'
// if(process.env.CHAT_ENV === 'prd'){
//     redisHost = 'pea-hrd-prd-redis-01-001.xnnhk0.0001.apn2.cache.amazonaws.com'
// }
//
// if(process.env.SERVER == 'local'){
//     redisClient = new redis({
//         port: 6379,
//         host: redisHost,
//         connectTimeout: 10000
//     });
//     redisStoreHost = redisHost;
// }else{
//     redisClient = new redis.Cluster([
//         {port: 6379, host: redisHost}
//     ]);
//
//     redisStoreHost = redisHost;
// }
//
// // Adapting Redis
// io.adapter(redisStore({ host: redisStoreHost, port: 6379 }));
//
// const apiRouter = require('./routes/api') (app,io,redisClient,pool);

// Routing
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {

    socket.on('chat_channel_connection', async (data) => {
        console.log('vue==============================>chat_channel_connection',data);
        socket.leave(socket.id);
        socket.join(data.channelNo);

        const connectDate = moment().format("YYYY-MM-DD HH:mm:ss");
        const userInfo ={
            socketId : socket.id,
            channelNo : data.channelNo,
            userId:data.userId,
            userName : data.userName,
            connectDate : connectDate
        }

        socket.userInfo = userInfo;
        data.socketId = socket.id;

        //레디스 채널별로 접속자 저장
        // await redisClient.hmset(data.channelNo, socket.id, JSON.stringify(userInfo));

        io.to(data.channelNo).emit('chat_channel_connection', data);

    });

    socket.on('message', async (data) => {
        console.log('==============================>message');

        const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

        data.socketId = socket.id;
        data.connectDate = currentDate;

        io.to(data.channelNo).emit('message', data);
    });

    socket.on('disconnect', async () => {
        console.log('--------------disconnect--------------------');
        console.log(socket.userInfo);

        if(socket.userInfo != undefined){
            //레이디스 데이터 삭제
            // redisClient.hdel(socket.userInfo.channelNo,socket.userInfo.socketId);

            socket.broadcast.to(socket.userInfo.channelNo).emit('disconnectCustom', {
                "userinfo" : socket.userInfo
            });
        }

    });
    socket.on('forceDisconnect', function() {
        console.log('-----------------------------------');
        io.to(socket.userInfo.channelNo).emit('disconnectCustom', socket.userInfo);
    })


    socket.on('disconnectCustom',async (data) => {
        console.log('==============================>disconnectCustom');
        // io.to(socket.userInfo.channelNo).emit('disconnectCustom',data);
    });


    socket.on('leave', (data) => {
        console.log('--------------leave--------------------');
        console.log('user leave', data);
    });

});

io2.on('connection', (socket) => {

    socket.on('message_channel_connection', async (data) => {
        console.log('==============================>io2 message_channel_connection',data);
        socket.leave(socket.id);
        socket.join(data.channelNo);

        const connectDate = moment().format("YYYY-MM-DD HH:mm:ss");
        const userInfo ={
            socketId : socket.id,
            channelNo : data.channelNo,
            userId:data.userId,
            userName : data.userName,
            connectDate : connectDate
        }

        socket.userInfo = userInfo;
        data.socketId = socket.id;

        //레디스 채널별로 접속자 저장
        // await redisClient.hmset(data.channelNo, socket.id, JSON.stringify(userInfo));

        io2.to(data.channelNo).emit('message_channel_connection', data);

    });

    socket.on('message', async (data) => {
        console.log('==============================>io2 message');
        console.log(data);

        const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

        data.socketId = socket.id;
        data.connectDate = currentDate;

        io2.to(data.channelNo).emit('message', data);
    });

    socket.on('disconnect', async () => {
        console.log('--------------io2 disconnect--------------------');
        console.log(socket.userInfo);

        if(socket.userInfo != undefined){
            //레이디스 데이터 삭제
            // redisClient.hdel(socket.userInfo.channelNo,socket.userInfo.socketId);

            socket.broadcast.to(socket.userInfo.channelNo).emit('disconnectCustom', {
                "userinfo" : socket.userInfo
            });
        }

    });
    socket.on('forceDisconnect', function() {
        console.log('io2 -----------------------------------');
        io2.to(socket.userInfo.channelNo).emit('disconnectCustom', socket.userInfo);
    })


    socket.on('disconnectCustom',async () => {
        console.log('==============================>io2 disconnectCustom');
        // io2.to(socket.userInfo.channelNo).emit('disconnectCustom');
    });


    socket.on('leave', (data) => {
        console.log('--------------leave--------------------');
        console.log('user leave', data);
    });

});




server.listen(port, () => {
    console.log('Server listening at port %d', port);
});


module.exports = app;