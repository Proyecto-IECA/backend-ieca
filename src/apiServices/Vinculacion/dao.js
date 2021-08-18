const conString = require("../../config/bd-ieca");
const mysql = require('mysql2');

// Función para buscar un usuario por su CURP
const querySingle = async(CURP) => {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection(conString);
        connection.query("SELECT * FROM alumnos WHERE curp = '" + CURP + "'", (err, rows) => {
            if (err) return reject(err);
            connection.end();
            return resolve(rows)
        });
    });

};

module.exports = {
    querySingle,
};