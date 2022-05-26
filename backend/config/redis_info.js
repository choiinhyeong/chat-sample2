module.exports = (function () {
  return {
    local: { // localhost
     host: '10.141.30.122',
      port: '6379'
    },
    stg: { // localhost
      //host: 'redisc-5h6kv.vpc-cdb.ntruss.com',
      host: '10.141.30.122',
      port: '6379'
    },
    real: { // localhost
      host: '10.141.30.122',
      port: '6379'
    },
  }
})();
