module.exports = (function () {
    return {
        local: {
            host: 'rds-mysql-kb-dev.cekhcviahx46.ap-northeast-2.rds.amazonaws.com',
            port: '3306',
            user: 'admin',
            password: '!!kbdbdev!!',
            database: 'PEA_MY',
            multipleStatements: true,
            connectionLimit:30
        },
    }
})();