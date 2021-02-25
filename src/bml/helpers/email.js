const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: process.env.PORT_EMAIL,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL
    }
});

const enviarEmail = async(email, token) => {
    const url = 'http://localhost:4200/activar-cuenta/?token=' + token;
    return transporter.sendMail({
        from: '"Ieca Server" <ieca@productividad-empresarial.com>',
        to: email,
        subject: 'Hola',
        text: url
    });
}

module.exports = {
    enviarEmail
}