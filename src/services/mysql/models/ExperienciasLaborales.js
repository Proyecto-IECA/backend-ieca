const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class ExpLaboral extends Model {}
ExpLaboral.init({
    id_experiencia_laboral: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    puesto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El puesto es necesario",
            },
            len: {
                args: [1, 70],
                msg: "La logitud del puesto debe de estar entre 1 y 70 caracteres",
            },
        },
    },

    empresa: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nombre de la empresa es necesario",
            },
            len: {
                args: [1, 70],
                msg: "La logitud del nombre de la empresa debe de estar entre 1 y 70 caracteres",
            },
        },
    },

    actividades: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },

    fecha_entrada: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La fecha de entrada es necesario",
            },
            len: {
                args: [7, 7],
                msg: "La fecha de entrada se compone de 7 caracteres",
            },
        },
    },

    fecha_salida: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            len: {
                args: [7, 7],
                msg: "La fecha de salida se compone de 7 caracteres",
            },
        },
    },

    trabajando: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El estado del trabajo es necesario",
            },
        },
    },
}, {
    sequelize,
    modelName: "Experiencias_Laborales",
    timestamps: false,
});

module.exports = ExpLaboral;