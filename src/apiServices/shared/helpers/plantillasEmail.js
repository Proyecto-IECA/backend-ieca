const messageRegistro = (url) => {
    const messageR = {
        asunto: "Activación de Cuenta IECA",
        message: `<div style="max-width: 560px; padding: 20px; background: #ffffff; border-radius: 5px; margin: 40px auto; font-family: Open Sans,Helvetica,Arial; font-size: 15px; color: #666;">
        <div style="color: #444444; font-weight: normal;">
        <div style="text-align: center; font-weight: 600; font-size: 26px; padding: 10px 0; border-bottom: solid 3px #eeeeee;">IECA</div>
        <div style="clear: both;"> </div>
        </div>
        <div style="padding: 0 30px 30px 30px; border-bottom: 3px solid #eeeeee;">
        <div style="padding: 30px 0; font-size: 24px; text-align: center; line-height: 40px;">Gracias por registrarte!Haga clic en el siguiente boton 
        para activar su cuenta.</div>
        <div style="padding: 10px 0 50px 0; text-align: center;"><a style="background: #052460; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 3px; letter-spacing: 0.3px;" href="${url}">Activa tu cuenta</a></div>
        </div>
        <div style="color: #999; padding: 20px 30px;">
        <div>Gracias!</div>
        <div>El <a style="color: #3ba1da; text-decoration: none;">IECA</a> Team</div>
        </div>
        </div>`
    }
    return messageR;
}

const messageRenewPass = (url) => {
    const messageRP = {
        asunto: "Recuperar contraseña IECA",
        message: `<div style="max-width: 560px; padding: 20px; background: #ffffff; border-radius: 5px; margin: 40px auto; font-family: Open Sans,Helvetica,Arial; font-size: 15px; color: #666;">
        <div style="color: #444444; font-weight: normal;">
        <div style="text-align: center; font-weight: 600; font-size: 26px; padding: 10px 0; border-bottom: solid 3px #eeeeee;">IECA</div>
        <div style="clear: both;"> </div>
        </div>
        <div style="padding: 0 30px 30px 30px; border-bottom: 3px solid #eeeeee;">
        <div style="padding: 30px 0; font-size: 24px; text-align: center; line-height: 40px;">Para actualizar tu contraseña!Haga clic en el siguiente boton</div>
        <div style="padding: 10px 0 50px 0; text-align: center;"><a style="background: #052460; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 3px; letter-spacing: 0.3px;" href="${url}">Actualizar contraseña</a></div>
        </div>
        <div style="color: #999; padding: 20px 30px;">
        <div>Gracias!</div>
        <div>El <a style="color: #3ba1da; text-decoration: none;">IECA</a> Team</div>
        </div>
        </div>`
    }

    return messageRP;
}

module.exports = {
    messageRegistro,
    messageRenewPass,
};