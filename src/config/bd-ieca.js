const conString = {
    host: process.env.SERVER_DB2,
    user: process.env.USER_DB2,
    password: process.env.PASSWORD_DB2,
    database: process.env.DATABASE_DB2,
    ssl: {
        rejectUnauthorized: true
    }
};

//Se exporta la constante
module.exports = conString;