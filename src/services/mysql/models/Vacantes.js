const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Vacante extends Model {}
Vacante.init({
    id_vacante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: null,
    },

    pusto: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: "Vacantes",
    timestamps: false,
});

module.exports = Vacante;