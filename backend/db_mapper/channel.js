let channel = {};

channel.getUserInfo = function(params){
  let sql="";
    sql += " SELECT ";
    sql += "  USER_SN,";
    sql += "  LRNER_ID,";
    sql += "  LRNER_NM";
    sql += " FROM COM_USERS";
    sql += " WHERE USER_SN="+params.userSn+"";
  return sql;
}


module.exports = channel;
