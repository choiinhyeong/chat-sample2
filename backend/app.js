// Setup basic express server
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
WhatapAgent = require('whatap').NodeAgent;
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

const crypto = require('./crypto');

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

io.attach(server)
io2.attach(server)

const redisStore  = require('socket.io-redis');
const redis = require('ioredis')

const port = 3000;

const mysql = require('mysql');
const dbConfig = require('./config/db_info')[process.env.SERVER];

const moment = require('moment');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


const pool = mysql.createPool(dbConfig);

console.log("process.env.SERVER : " , process.env.SERVER,',', process.env.CHAT_ENV);

/**
 *  기존 레디스 관련
 */

let redisClient = null;
let redisStoreHost = null;
/*
*  내부 레디스주소 나중에 env로 빼기
* */
// let redisHost = 'pea-hrd-dev-redis.o88ccj.0001.apn2.cache.amazonaws.com'
// if(process.env.CHAT_ENV === 'prd'){
//     redisHost = 'pea-hrd-prd-redis-01-001.xnnhk0.0001.apn2.cache.amazonaws.com'
// }

// 외부 레디스 주소
let redisHost = 'pea-hrd-dev-redis-001.dlhlmy.0001.apn2.cache.amazonaws.com'
if(process.env.CHAT_ENV === 'prd'){
    redisHost = 'pea-hrd-dev-redis-001.dlhlmy.0001.apn2.cache.amazonaws.com'
}
if(process.env.SERVER == 'local'){
    redisClient = new redis({
        port: 6379,
        host: redisHost,
        connectTimeout: 10000
    });
    redisStoreHost = redisHost;
}else{
    redisClient = new redis.Cluster([
        {port: 6379, host: redisHost}
    ]);
    redisStoreHost = redisHost;
}
// Adapting Redis
io.adapter(redisStore({ host: redisStoreHost, port: 6379 }));

// api router
const apiRouter = require('./routes/api') (app,io,redisClient,pool);
// url path router
const indexRouter = require('./routes/index');

let history = require('connect-history-api-fallback');

app.use('/', indexRouter);
app.use('/chat/cloud/now', indexRouter);
app.use('/chat/cloud/on', indexRouter);
app.use('/chat/cloud/conf', indexRouter);

// Routing
app.use(express.static(path.join(__dirname, 'public')));

app.use(history());

/**
 * 챗 과련 소켓
 */
io.on('connection', (socket) => {

    socket.on('chat_channel_connection', async (data) => {
        console.log('==============================>chat_channel_connection',data);
        socket.leave(socket.id);
        socket.join(data.channelNo);

        const connectDate = moment().format("YYYY-MM-DD HH:mm:ss");
        const userInfo ={
            socketId : socket.id,
            channelNo : data.channelNo,
            lrnerId: data.lrnerId,
            lrnerNm : data.lrnerNm,
            connectDate : connectDate
        }

        socket.userInfo = userInfo;
        data.socketId = socket.id;
        data.connectDate = connectDate;

        //레디스 채널별로 접속자 저장
        if(redisClient !== null){
            console.log('redis is not null === ',data.channelNo,',', socket.id,',', JSON.stringify(userInfo))
            await redisClient.hmset(data.channelNo, socket.id, JSON.stringify(userInfo));
        }
        io.to(data.channelNo).emit('chat_channel_connection', data);

    });

    socket.on('message', async (data) => {
        console.log('==============================>dom message',data);

        const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

        data.socketId = socket.id;
        data.connectDate = currentDate;

        io.to(data.channelNo).emit('message', data);
    });

    socket.on('disconnect', async () => {
        console.log('--------------disconnect--------------------',socket.userInfo.channelNo,',',socket.userInfo.socketId);

        if(socket.userInfo != undefined){
            //레이디스 데이터 삭제
            if(redisClient !== null){
                redisClient.hdel(socket.userInfo.channelNo,socket.userInfo.socketId);
            }

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

/**
 * dom컨트롤 관련 소켓
 */
io2.on('connection', (socket) => {

    socket.on('domSocket_channel_connection', async (data) => {
        console.log('==============================>domSocket_channel_connection',data);
        socket.leave(socket.id);
        socket.join(data.channelNo);

        const connectDate = moment().format("YYYY-MM-DD HH:mm:ss");
        const userInfo ={
            socketId2 : socket.id,
            channelNo : data.channelNo,
            lrnerId: data.lrnerId,
            lrnerNm : data.lrnerNm,
            connectDate : connectDate
        }

        socket.userInfo = userInfo;
        data.socketId2 = socket.id;

        //레디스 채널별로 접속자 저장
        // if(redisClient !== null){
        //     await redisClient.hmset(data.channelNo, socket.id, JSON.stringify(userInfo));
        // }

        io2.to(data.channelNo).emit('domSocket_channel_connection', data);

    });

    socket.on('message', async (data) => {
        console.log('==============================>domSocket message',data);

        const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");

        data.socketId2 = socket.id;
        data.connectDate = currentDate;

        io2.to(data.channelNo).emit('message', data);
    });

    socket.on('cloudNowConfConnection', async (data) => {
        console.log('cloudNowConfConnection;;;;',data);

        // const currentDate = moment().format("YYYY-MM-DD HH:mm:ss");
        //
        // data.socketId2 = socket.id;
        // data.connectDate = currentDate;

        io2.to(data.channelNo).emit('cloudNowConfConnection', data);
    });

    socket.on('disconnect', async () => {
        console.log('--------------domSocket disconnect--------------------');
        console.log(socket.userInfo);

        if(socket.userInfo != undefined){
            //레이디스 데이터 삭제
            // if(redisClient !== null){
            //     redisClient.hdel(socket.userInfo.channelNo,socket.userInfo.socketId2);
            // }

            socket.broadcast.to(socket.userInfo.channelNo).emit('disconnectCustom', {
                "userinfo" : socket.userInfo
            });
        }

    });
    socket.on('forceDisconnect', function() {
        console.log('domSocket forceDisconnect -----------------------------------');
        io2.to(socket.userInfo.channelNo).emit('disconnectCustom', socket.userInfo);
    })


    socket.on('disconnectCustom',async () => {
        console.log('==============================>domSocket disconnectCustom');
        // io2.to(socket.userInfo.channelNo).emit('disconnectCustom');
    });


    socket.on('leave', (data) => {
        console.log('--------------domSocket leave--------------------');
        console.log('user leave', data);
    });

});

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});


module.exports = app;