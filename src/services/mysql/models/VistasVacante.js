const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class VistaVacante extends Model {}
VistaVacante.init({
    id_vista_vacante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Vistas_Vacante",
    timestamps: false
});

module.exports = VistaVacante