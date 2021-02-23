//Se requiere el uso de jsonwebtoken
const jwt = require('jsonwebtoken');
const { getRefreshToken, expiredRefreshToken } = require('../helpers/jwt')

//Funcion para validar el token antes de ejecutar las peticiones HTTP
const validJWT = async(req, res, next) => {
    //Se crea una constante que sera igual al token que se manda por el header de nuestro endpoint
    const token = req.header('x-token');
    const refreshToken = req.header('r-token');
    //Si el token esta vacio
    if (!token) {
        return res.json({
            status: false,
            message: 'La peticion no tiene token',
            data: null
        });
    }
    try {
        //En una constante se guarda el resultado de validar el token
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        //Se iguala el id del enpoint con el de la validacion
        req.id = id;
        //Se deja pasar la peticion
        next();
    } catch (error) {
        return res.json({
            status: false,
            message: 'Token invalido',
            data: null
        });
    }
}

const validRefreshToken = async(req, res, next) => {
    const token = req.header('x-token');
    const rToken = req.header('r-token');

    if (!token & !rToken) {
        return res.json({
            status: false,
            message: 'La peticion no tiene token y refreshToken',
            data: null
        });
    }

    if (!token) {
        return res.json({
            status: false,
            message: 'La peticion no tiene token',
            data: null
        });
    }

    if (!rToken) {
        return res.json({
            status: false,
            message: 'La peticion no tiene refreshToken',
            data: null
        });
    }

    try {
        const decodedToken = jwt.decode(token);
        const jwt_id = decodedToken.jti;
        const refreshToken = getRefreshToken(jwt_id, rToken);
        console.log(refreshToken);
    } catch (error) {
        return res.json({
            status: false,
            message: 'Token invalido',
            data: null
        })
    }
}



//Se exporta la funcion para validar el token
module.exports = {
    validJWT
}