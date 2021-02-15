const mysql = require('mysql');
const conString = require('./config');
const connection = mysql.createConnection(conString);

const query = (stpName) => {
    return new Promise((resolve, reject) => {
        connection.query('CALL ' + stpName, (err, rows) => {
            if (err) return reject(err);
            return resolve(rows)
        });
    });
}

const queryParams = (stpName, mysqlParams) => {
    return new Promise((resolve, reject) => {
        connection.query('CALL ' + stpName, mysqlParams, (err, rows) => {
            if (err) return reject(err);
            return resolve(rows)
        });
    });
}

module.exports = { query, queryParams };