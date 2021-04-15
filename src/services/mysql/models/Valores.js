const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Valor extends Model {}
Valor.init({
    id_valor: {
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
                msg: "El valor es necesario",
            },
            len: {
                args: [1, 50],
                msg: "El valor debe ser mayor a 1 y menor de 50 caracteres",
            },
        },
    },
}, {
    sequelize,
    modelName: "Valores",
    timestamps: false,
});

module.exports = Valor;