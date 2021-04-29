const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Postulacion = require("./Postulaciones");
const Perfil = require("./Perfiles");

class Vacante extends Model {}
Vacante.init({
    id_vacante: {
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
                msg: "El puesto es obligatorio",
            },
            len: {
                args: [1, 70],
                msg: "El puesto debe estar entre 1 y 70 caracteres",
            },
        },
    },

    fecha_publicacion: {
        type: DataTypes.DATEONLY,
        defaultValue: null,
    },

    imagen: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },

    sueldo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El sueldo es obligatorio",
            },
            len: {
                args: [1, 20],
                msg: "El sueldo debe estar entre 1 y 20 caracteres",
            },
        },
    },

    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La descripcion es obligatoria",
            },
        },
    },

    disponible: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    },

    modalidad: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La modalidad es obligatoria",
            },
            len: {
                args: [1, 50],
                msg: "La modalidad debe tener entre 1 y 50 caracteres",
            },
        },
    },

    nivel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nivel es obligatorio",
            },
            len: {
                args: [1, 50],
                msg: "El nivel debe tener entre 1 y 50 caracteres",
            },
        },
    },

    vistas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },

    publicada: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },

    activo: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    },
}, {
    sequelize,
    modelName: "Vacantes",
    timestamps: false,
});

Vacante.hasMany(Postulacion, { foreignKey: "id_vacante_fk" });
Postulacion.belongsTo(Vacante, { foreignKey: "id_vacante_fk" });

Vacante.belongsToMany(Perfil, {
    through: "Perfiles_Vacante",
    timestamps: false,
    foreignKey: "id_vacante_fk"
});

Perfil.belongsToMany(Vacante, {
    through: "Perfiles_Vacante",
    timestamps: false,
    foreignKey: "id_perfil_fk",
});

module.exports = Vacante;