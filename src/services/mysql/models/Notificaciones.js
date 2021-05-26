const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Notificacion extends Model {}
Notificacion.init({
    id_notificacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    url: {
        type: DataTypes.STRING,
        defaultValue: null
    },

    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El titulo es obligatorio"
            }
        }
    },

    mensaje: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El mensaje es obligatorio"
            }
        }
    },

    visto: {
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
    modelName: "Notificaciones",
    timestamps: false
});

module.exports = Notificacion;