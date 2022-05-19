module.exports = (function () {
  return {
    local: { // localhost
     host: '110.165.17.254',
      port: '6379'
    },
    stg: { // localhost
      //host: 'redisc-5h6kv.vpc-cdb.ntruss.com',
      host: '172.24.1.100',
      port: '6379'
    },
    real: { // localhost
      host: '110.165.17.254',
      port: '6379'
    },
  }
})();
