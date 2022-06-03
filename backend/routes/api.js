let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
let channelSql = require('../db_mapper/channel.js');
const crypto = require('../crypto');

module.exports = function(app,io,pool)
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

    // 사용자 정보 가져오기
    app.get('/api/chat/user/:userSn', async function (req, res) {
        console.log('===============> /get/user',req.params.userSn)
        let userSn = req.params.userSn;
        let param = {userSn: userSn};
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