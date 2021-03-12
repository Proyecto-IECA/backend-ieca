//Se crea una constante que sera la cadena de conexion a la BD
const conString = {
    host: process.env.SERVER_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    port: process.env.PORT_DB,
};

//Se exporta la constante
module.exports = conString;