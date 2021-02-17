const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const moment = require('moment');
const { queryParams } = require('../../dal/data-access');

const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id
        };
        const jwt_id = uuid.v4();
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h',
            jwtid: jwt_id
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el JWT');
                throw new Error(err);
            } else {
                resolve({ token, jwt_id });
            }
        })
    });
}

const generateTokenRefreshToken = async(id_postulante) => {
    const generateToken = await generateJWT(id_postulante);
    const token = generateToken.token;
    const jwt_id = generateToken.jwt_id;
    const fecha_expiracion = moment().add(10, 'd').toDate();
    const mysqlParamsT = [
        jwt_id,
        fecha_expiracion,
        id_postulante
    ];
    const generateRToken = await queryParams('stp_add_token_postulante(?, ?, ?)', mysqlParamsT);
    const refreshToken = uuid.stringify(generateRToken[0][0].id_token);
    return { token, refreshToken }
}

module.exports = { generateTokenRefreshToken }