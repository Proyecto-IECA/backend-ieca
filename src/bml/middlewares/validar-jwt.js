const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.json({
            status: false,
            message: 'La peticion no tiene token',
            data: null
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        next();
    } catch (error) {
        return res.json({
            status: false,
            message: 'Token invalido',
            data: null
        });
    }
}

module.exports = {
    validarJWT
}