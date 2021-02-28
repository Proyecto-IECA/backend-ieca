//Se requiere del metodo queryParams del archivo data-access.js
const { queryParams } = require('../../dal/data-access');
//Se requiere del metodo generateTokenRefreshToken del archivo jwt.js
const { generateJWT } = require('../helpers/jwt');
//Se requiere la funcion para enviar el email
const { enviarEmail } = require('../helpers/email');

const sendEmailValidPassword = async(req, res) => {
    //Se crea una constante con el atributo del body de nuetra peticion
    const { email } = req.body;
    //Creamos una constante con el parametro para el procedimiento almacenado
    const mysqlParam = [email];

    //Variable que sera igual a la respuesta de la ejecucion del procedimiento almacenado
    const postulante = await queryParams('stp_login_postulante(?)', mysqlParam);
    const url = 'http://localhost:4200/#/forgetPassword/?token=';
    //Si el email no existe en la BD
    if (postulante[0] != '') {
        //Generamos los tokens del postulante
        const tokens = await generateJWT(email);

        //Enviamos el email al correo del postulante
        enviarEmail(url, email, tokens.token, 1);

        return res.json({
            status: true,
            message: 'Envio correcto del email',
            data: null
        });
    }

    const empresa = queryParams('stp_login_empresa(?)', mysqlParam);
    if (empresa[0] != undefined) {
        //Generamos los tokens del postulante
        const tokens = await generateJWT(email);

        //Enviamos el email al correo del postulante
        enviarEmail(url, email, tokens.token, 2);

        return res.json({
            status: true,
            message: 'Envio correcto del email',
            data: null
        });
    }

    res.json({
        status: false,
        message: 'No existe ese correo en la Base de Datos',
        data: null
    })
}

module.exports = {
    sendEmailValidPassword
}