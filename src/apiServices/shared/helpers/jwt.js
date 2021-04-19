const jwt = require("jsonwebtoken");

const generateJWT = (id, duracion) => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, {
                expiresIn: duracion,
            },
            (err, token) => {
                if (err) {
                    reject("No se pudo generar el JWT");
                    throw new Error(err);
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    generateJWT,
};