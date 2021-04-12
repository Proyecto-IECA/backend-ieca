const { Sequelize } = require("sequelize");
const { database } = require("../../config/development");

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: "mysql",
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true,
            },
        },
    }
);

module.exports = sequelize;