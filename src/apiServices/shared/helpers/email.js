// Importación de las librarías necesarias
const nodemailer = require("nodemailer");
const { messageRegistro, messageRenewPass } = require("./plantillasEmail");
const { google } = require("googleapis");

// Configuración de la autentificación con gmail
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const accessToken = async() => {
    await oAuth2Client.getAccessToken();
}

// Configuración del transporter de nodemailer para el envio de correos
const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        type: process.env.TYPE,
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
    },
});

// Función para enviar un correo
const sendEmail = async(email, asunto, message) => {
    return transporter.sendMail({
        from: '"Ieca Server" <iecateam22@gmail.com>',
        to: email,
        subject: asunto,
        html: message
    });
};

// Función para estructurar el contenido del correo que se enviara
const enviarEmail = async(tipo, url, email) => {
    let message;
    let asunto;
    switch (tipo) {
        case "validarEmail":
            const messageR = messageRegistro(url);
            message = messageR.message;
            asunto = messageR.asunto;
            break;
        default:
            const messageRP = messageRenewPass(url);
            message = messageRP.message;
            asunto = messageRP.asunto;
            break;
    }

    sendEmail(email, asunto, message);

}

module.exports = {
    enviarEmail,
};