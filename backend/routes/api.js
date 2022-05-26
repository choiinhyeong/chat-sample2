let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
let channelSql = require('../db_mapper/channel.js');


// module.exports = function(app,io,pool)
module.exports = function(app,io,redisClient,pool)
{
    app.get('/api/chat/user/:userSn', async function (req, res, next) {
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