let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
let channelSql = require('../db_mapper/channel.js');
const crypto = require('../crypto');

module.exports = function(app, io, redisClient, pool)
{
    // 사용자 정보 암호화
    app.get('/api/chat/users/encrypt', async function (req, res, next) {
        console.log('/api/chat/users/encrypt ========>',req.query);
        let query = crypto.encrypt(JSON.stringify(req.query))
        res.json(query);
    });

    // 사용자 정보 복호화
    app.get('/api/chat/users/decrypt', async function (req, res, next) {
        console.log('/api/chat/users/decrypt ========>',req.query[0]);
        let query = crypto.decrypt(req.query[0])
        res.json(JSON.parse(query));
    });

    //채널에 접속한 사용자 리스트를 제공한다.
    app.get('/api/chat/redis/userlist/:channelNo', async function (req, res, next) {
        console.log('redis channel ====> ',req.params.channelNo);
        let channelNo = req.params.channelNo;
        let arrayList = new Array();

        if(redisClient !== null){
            await redisClient.hgetall(channelNo, function(err, obj) {
                if(err) throw err;
                console.log('redis users count apu ======> ',arrayList)
                arrayList.push(JSON.stringify(obj));
            });
        }
        res.json(arrayList);
    });

    // 사용자 정보 가져오기
    app.get('/api/chat/userlist', async function (req, res) {
        console.log('===============> /get/userlist',)
        let param = {};
        pool.getConnection((err, connection) => {
            console.log('getConnection-----------------')
            if ( err ) {
                throw err;
            }else{
                connection.query(channelSql.getUserInfo(param), function(err,results){
                    if (!err){
                        console.log('RESULT ======> ',results)
                        connection.release();
                        res.json(results);
                    }else{
                        throw err;
                    }
                });
            }
        });
    });

};