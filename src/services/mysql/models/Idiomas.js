const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Idioma extends Model {}
Idioma.init({
    id_idioma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El Idioma es necesario",
            },
            len: {
                args: [1, 50],
                msg: "El idioma debe ser mayor a 1 y menor de 50 caracteres",
            },
        },
    },
}, {
    sequelize,
    modelName: "Idiomas",
    timestamps: false,
});

module.exports = Idioma;