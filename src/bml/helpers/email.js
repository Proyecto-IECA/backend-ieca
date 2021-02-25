const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.mx',
    port: 587,
    secure: false,
    auth: {
        user: 'ieca@productividad-empresarial.com',
        pass: 'Iecamola@22'
    }
});

const enviarEmail = async() => {
    return transporter.sendMail({
        from: '"Ieca Server" <ieca@productividad-empresarial.com>',
        to: 'carlosorozco4565@gmail.com',
        subject: 'Hola',
        text: 'Hello World'
    });
}

module.exports = {
    enviarEmail
}