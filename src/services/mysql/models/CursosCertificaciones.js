const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class CursoCert extends Model {}
CursoCert.init({
    id_curso_certificacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nombre del curso es obligatorio",
            },
            len: {
                args: [1, 70],
                msg: "El nombre del curso debe tener al menos 1 caracter y menos de 70",
            },
        },
    },

    descripcion: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },

    link: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },
}, {
    sequelize,
    modelName: "Cursos_Certificaciones",
    timestamps: false,
});

module.exports = CursoCert;