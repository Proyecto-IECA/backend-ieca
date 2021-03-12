//Se requiere del metodo queryParams del archivo data-access.js
const { queryParams } = require("../../dal/data-access");
//Se requiere del metodo generateTokenRefreshToken del archivo jwt.js
const { generateJWTEmail } = require("../helpers/jwt");
//Se requiere la funcion para enviar el email
const { enviarEmail } = require("../helpers/email");

const sendEmailValidPassword = async(req, res) => {
    //Se crea una constante con el atributo del body de nuetra peticion
    const { email } = req.body;
    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParam = [email];
    //Creamos una constante con la url para el email
    const url = "http://localhost:4200/#/forgetPassword/";

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let postulante = await queryParams("stp_login_postulante(?)", mysqlParam);

    //Si el email existe en la tabla de postulantes en la BD
    if (postulante[0] != "") {
        //Generamos los tokens del postulante
        const tokens = await generateJWTEmail(email);

        //Enviamos el email al correo del postulante
        enviarEmail(url, email, tokens.token, 1);

        return res.json({
            status: true,
            message: "Envio correcto del email",
            data: null,
        });
    }

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    let empresa = await queryParams("stp_login_empresa(?)", mysqlParam);

    //Si el email existe en la tabla de empresas en la BD
    if (empresa[0] != "") {
        //Generamos los tokens de la empresa
        const tokens = await generateJWTEmail(email);

        //Enviamos el email al correo de la empresa
        enviarEmail(url, email, tokens.token, 2);

        return res.json({
            status: true,
            message: "Envio correcto del email",
            data: null,
        });
    }

    res.json({
        status: false,
        message: "No existe ese correo en la Base de Datos",
        data: null,
    });
};

const sendEmailValidEmail = async(req, res) => {
    //Se crea una constante con el atributo del body de nuetra peticion
    const { email, tipo } = req.body;
    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParam = [email];
    //Creamos una constante con la url para el email
    const url = "http://localhost:4200/#/validarEmail/";

    if (tipo == 1) {
        //Generamos los tokens del postulante
        const tokens = await generateJWTEmail(email);

        //Enviamos el email al correo del postulante
        enviarEmail(url, email, tokens.token, 1);
        return res.json({
            status: true,
            message: "Envio correcto del email",
            data: null,
        });
    }

    //Generamos los tokens de la empresa
    const tokens = await generateJWTEmail(email);

    //Enviamos el email al correo de la empresa
    enviarEmail(url, email, tokens.token, 2);

    return res.json({
        status: true,
        message: "Envio correcto del email",
        data: null,
    });
};

//Exportamos la funcion para enciar el correo para recuperar la contraseña
module.exports = {
    sendEmailValidPassword,
    sendEmailValidEmail,
};