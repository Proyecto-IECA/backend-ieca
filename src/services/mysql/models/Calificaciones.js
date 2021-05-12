const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Calificacion extends Model {}
Calificacion.init({
    id_calificacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    fecha_calificacion: {
        type: DataTypes.DATEONLY,
        defaultValue: new Date(Date.now()),
    },

    calificacion: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La calificacion es obligatoria",
            },
            max: {
                args: [5],
                msg: "Ingrese un número entre 0 y 5"
            },
            min: {
                args: [0],
                msg: "Ingrese un número entre 0 y 5"
            }
        },
    },
}, {
    sequelize,
    modelName: "Calificaciones",
    timestamps: false,
});

module.exports = Calificacion;