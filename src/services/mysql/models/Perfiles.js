const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Perfil extends Model {}
Perfil.init({
    id_perfil: {
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
                msg: "El perfil es necesario",
            },
            len: {
                args: [1, 50],
                msg: "El perfil debe ser mayor a 1 y menor de 50 caracteres",
            },
        },
    },
}, {
    sequelize,
    modelName: "Perfiles",
    timestamps: false,
});

module.exports = Perfil;