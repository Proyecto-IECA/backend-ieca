const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

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

    apellido_paterno: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            len: {
                args: [1, 50],
                msg: "El nombre tiene que tener al menos un caracter y menos de 50",
            },
        }
    },

    apellido_materno: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            len: {
                args: [1, 50],
                msg: "El nombre tiene que tener al menos un caracter y menos de 50",
            },
        }
    },

    fecha_nacimiento: {
        type: DataTypes.DATE,
        defaultValue: null,
        validate: {
            isDate: {
                args: true,
                msg: "Ingresa una fecha valida"
            }
        }
    },

    sexo: {
        type: DataTypes.CHAR,
        defaultValue: null,
        validate: {
            len: {
                args: [1, 1],
                msg: "El sexo solo puede ser un caracter"
            }
        }
    },

    administrador: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            len: {
                args: [1, 100],
                msg: "El nombre tiene que tener al menos un caracter y menos de 50",
            },
        }
    },

    ubicacion: {
        type: DataTypes.TEXT,
        defaultValue: null
    },

    giro: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            isAlpha: {
                args: true,
                msg: "El nombre solo puede contener letras",
            },
            len: {
                args: [1, 50],
                msg: "El nombre tiene que tener al menos un caracter y menos de 50",
            },
        }
    }

}, {
    sequelize,
    modelName: "Usuarios",

});




module.exports = Usuario;