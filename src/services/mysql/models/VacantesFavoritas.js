const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class VacantesFav extends Model {}
VacantesFav.init({
    id_vacante_favorita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "Vacantes_Favoritas",
    timestamps: false,
});

module.exports = VacantesFav;