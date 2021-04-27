const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const Vacante = require("./Vacantes");

class Sucursal extends Model {}
Sucursal.init({
    id_sucursal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    ubicacion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La ubicacion de la sucursal es necesaria",
            },
        },
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nombre de la sucursal es necesario",
            },
            len: {
                args: [1, 100],
                msg: "El nombre de la sucursal debe tener mas de 1 caracter y menos de 100",
            },
        },
    },
}, {
    sequelize,
    modelName: "Sucursales",
    timestamps: false,
});

Sucursal.hasMany(Vacante, { foreignKey: "id_sucursal_fk" });
Vacante.belongsTo(Sucursal, { foreignKey: "id_sucursal_fk" });


module.exports = Sucursal;