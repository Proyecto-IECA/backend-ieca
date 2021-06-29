const conString = require("../../config/bd-ieca");
const mysql = require('mysql2');
const connection = mysql.createConnection(conString);


const querySingle = async(CURP) => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM alumnos WHERE curp = '" + CURP + "'", (err, rows) => {
            console.log(err);
            if (err) return reject(err);
            return resolve(rows)
        });
    });

};

module.exports = {
    querySingle,
};