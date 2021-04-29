const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");


class Postulacion extends Model {}
Postulacion.init({
    id_postulacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    fecha_postulacion: {
        type: DataTypes.DATEONLY,
        defaultValue: new Date(Date.now())
    },

    aceptada: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },

    rechazada: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0
    },

    activo: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1
    }

}, {
    sequelize,
    modelName: "Postulaciones",
    timestamps: false
});

module.exports = Postulacion;