//Se requiere de la dependencia mysql y la almacenamos en una constante
const mysql = require("mysql");
//Se requiere de la cadena de conexion del archivo .config.js
const conString = require("./config");

//Se crea una constante que sera la conexion a la base de datos con ayuda de la cadena de conexion
const connection = mysql.createConnection(conString);

/*Funcion que recibira un procedimiento almacenado para retornar una promesa resultante de la 
ejecucion del procedimiento almacenado */
const query = (stpName) => {
    return new Promise((resolve, reject) => {
        connection.query("CALL " + stpName, (err, rows) => {
            if (err) return reject(err);
            return resolve(rows);
        });
    });
};

/*Funcion que recibira un procedimiento almacenado y parametros para retornar una promesa resultante 
de la ejecucion del procedimiento almacenado */
const queryParams = (stpName, mysqlParams) => {
    return new Promise((resolve, reject) => {
        connection.query("CALL " + stpName, mysqlParams, (err, rows) => {
            if (err) return reject(err);
            return resolve(rows);
        });
    });
};

//Se exportan las dos funciones
module.exports = {
    query,
    queryParams,
};