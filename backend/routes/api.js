let moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");
let channelSql = require('../db_mapper/channel.js');


module.exports = function(app,io,pool)
{
    app.get('/get/user', async function (req, res, next) {
        console.log('===============> /chat/api/get/user')
        pool.getConnection((err, connection) => {
            console.log('getConnection-----------------')
            if ( err ) {
                throw err;
            }else{
                connection.query(channelSql.getUserInfo(), function(err,results){
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