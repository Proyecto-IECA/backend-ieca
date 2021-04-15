const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Habilidad extends Model {}
Habilidad.init({
    id_habilidad: {
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
                msg: "La habilidad es necesaria",
            },
            len: {
                args: [1, 50],
                msg: "La habilidad debe ser mayor a 1 y menor de 50 caracteres",
            },
        },
    },
}, {
    sequelize,
    modelName: "Habilidades",
    timestamps: false,
});

module.exports = Habilidad;