// Importación de las librarías necesarias
const { Sequelize } = require("sequelize");
const { database } = require("../../config/development");

// Configuración de la cadena conexión a la base de datos con sequelize 
const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: "mysql",
    }
);

module.exports = sequelize;