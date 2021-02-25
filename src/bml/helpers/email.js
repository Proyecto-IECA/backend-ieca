const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'Gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSEMAIL
    }
});

const enviarEmail = async() => {
    return transporter.sendMail({
        from: '"Ieca Server" <correoIeca22@gmail.com>',
        to: 'carlosorozco4565@gmail.com',
        subject: 'Hola',
        text: 'Hello World'
    });
}

module.exports = {
    enviarEmail
}