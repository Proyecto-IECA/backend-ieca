const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Comentario extends Model {}
Comentario.init({
    id_comentario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    fecha_publicacion: {
        type: DataTypes.DATEONLY,
        defaultValue: new Date(Date.now()),
    },

    comentario: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El comentario es necesario",
            },
        },
    },
}, {
    sequelize,
    modelName: "Comentarios",
    timestamps: false,
});

module.exports = Comentario;