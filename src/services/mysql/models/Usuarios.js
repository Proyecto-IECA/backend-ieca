const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const CursoCert = require("./CursosCertificaciones");
const ExpAcademica = require("./ExperienciasAcademicas");

class Usuario extends Model {}
Usuario.init({
    id_usuario: {
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
                msg: "El nombre es obligatorio",
            },
            len: {
                args: [1, 50],
                msg: "El nombre tiene que tener al menos un caracter y menos de 50",
            },
        },
    },

    telefono: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            isNumeric: {
                args: true,
                msg: "El telefono tiene que ser valido",
            },
            len: {
                args: [10, 10],
                msg: "El telefono tiene que tener 10 digitos",
            },
        },
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "Este email ya esta en uso",
        },
        validate: {
            notNull: {
                msg: "El email es obligatorio",
            },
            isEmail: {
                args: true,
                msg: "Ingresa un email valido",
            },
        },
    },

    pass: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El password es necesario",
            },
        },
    },

    email_validado: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },

    sups_notificacion: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },

    tipo_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Postulante",
        validate: {
            notNull: {
                msg: "Favor de indicar el tipo de usuario",
            },
            isAlpha: {
                args: true,
                msg: "El tipo de usuario solo puede tener letras",
            },
        },
    },

    activo: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
        validate: {
            notNull: "Favor de indicar si el usario esta activo",
        },
    },

    foto_perfil: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },

    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            notNull: "Favor de indicar la calificacion del usuario",
        },
    },

    apellido_paterno: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            len: {
                args: [1, 50],
                msg: "El nombre tiene que tener al menos un caracter y menos de 50",
            },
        },
    },

    apellido_materno: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            len: {
                args: [1, 50],
                msg: "El nombre tiene que tener al menos un caracter y menos de 50",
            },
        },
    },

    fecha_nacimiento: {
        type: DataTypes.DATE,
        defaultValue: null,
        validate: {
            isDate: {
                args: true,
                msg: "Ingresa una fecha valida",
            },
        },
    },

    sexo: {
        type: DataTypes.CHAR,
        defaultValue: null,
        validate: {
            len: {
                args: [1, 1],
                msg: "El sexo solo puede ser un caracter",
            },
        },
    },

    administrador: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            len: {
                args: [1, 100],
                msg: "El nombre tiene que tener al menos un caracter y menos de 50",
            },
        },
    },

    ubicacion: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },

    giro: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            isAlpha: {
                args: true,
                msg: "El giro solo puede contener letras",
            },
            len: {
                args: [1, 50],
                msg: "El giro tiene que tener al menos un caracter y menos de 50",
            },
        },
    },

    cv: {
        type: DataTypes.TEXT,
        defaultValue: null,
    },

    pais: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            len: {
                args: [1, 50],
                msg: "El pais tiene que tener al menos un caracter y menos de 50",
            },
        },
    },

    codigo_postal: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            isNumeric: {
                args: true,
                msg: "El codigo postal solo puede tener numeros",
            },
            len: {
                args: [5, 5],
                msg: "Ingrese un codigo postal valido",
            },
        },
    },

    ciudad: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            len: {
                args: [1, 50],
                msg: "La ciudad tiene que tener al menos un caracter y menos de 50",
            },
        },
    },

    domicilio: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            len: {
                args: [1, 120],
                msg: "La ciudad tiene que tener al menos un caracter y menos de 50",
            },
        },
    },

    telefono_casa: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            isNumeric: {
                args: true,
                msg: "El telefono tiene que ser valido",
            },
            len: {
                args: [10, 10],
                msg: "El telefono tiene que tener 10 digitos",
            },
        },
    },

    pagina_web: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            len: {
                args: [1, 200],
                msg: "La pagina web debe tener mas de 3 caracteres y menos de 120",
            },
        },
    },

    numero_sucursales: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: "Usuarios",
});

Usuario.hasMany(CursoCert, { foreignKey: "id_usuario_fk" });
CursoCert.belongsTo(Usuario, { foreignKey: "id_usuario_fk" });

Usuario.hasMany(ExpAcademica, { foreignKey: "id_usuario_fk" });
ExpAcademica.belongsTo(Usuario, { foreignKey: "id_usuario_fk" });

module.exports = Usuario;