const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class ExpAcademica extends Model {}
ExpAcademica.init({
    id_experiencia_academica: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    nivel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nivel es necesario",
            },
            len: {
                args: [1, 30],
                msg: "La logitud del nivel debe de estar entre 1 y 30 caracteres",
            },
        },
    },

    institucion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La institucion  es necesario",
            },
            len: {
                args: [1, 70],
                msg: "El nombre de la institucion debe de estar entre 1 y 70 caracteres",
            },
        },
    },

    carrera: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La carrera  es necesario",
            },
            len: {
                args: [1, 50],
                msg: "La carrera debe de estar entre 1 y 70 caracteres",
            },
        },
    },

    anio_entrada: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El año de entrada es necesario",
            },
        },
    },

    anio_salida: {
        type: DataTypes.STRING,
        defaultValue: null,
    },

    estudiando: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El estado del estudio es necesario",
            },
        },
    },
}, {
    sequelize,
    modelName: "Experiencias_Academicas",
    timestamps: false,
});

module.exports = ExpAcademica;