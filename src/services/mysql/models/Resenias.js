const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Resenia extends Model {}
Resenia.init({
    id_resenia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    fecha_resenia: {
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

    comentario: {
        type: DataTypes.TEXT,
        defaultValue: null
    },
}, {
    sequelize,
    modelName: "Resenias",
    timestamps: false,
});

module.exports = Resenia;