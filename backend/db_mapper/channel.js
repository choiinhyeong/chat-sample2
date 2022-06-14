let channel = {};

channel.getUserInfo = function(params){
  console.log('params,',params)
  let sql="";
    sql += " SELECT ";
    sql += "  USER_SN,";
    sql += "  LRNER_ID,";
    sql += "  LRNER_NM";
    sql += " FROM COM_USERS";
    sql += " ORDER BY USER_SN DESC ";
    sql += " LIMIT 0, 10";
  return sql;
}


module.exports = channel;
