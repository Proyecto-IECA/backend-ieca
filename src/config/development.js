// Variables para la cadena de conexión haciendo uso de las variables del entorno
module.exports = {
    database: {
        username: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DATABASE_DB,
        host: process.env.SERVER_DB,
    },
};