module.exports = (function () {
    return {
        local: {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            // multipleStatements: true,
            // connectionLimit:30
        },
    }
})();