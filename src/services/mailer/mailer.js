const nodemailer = require("nodemailer");
const configObject = require("../../config/env.config");
const { logger } = require("../../middleware/logger.middleware");


class EmailManager {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: configObject.mailer.mailer_user,
        pass: configObject.mailer.mailer_pass,
      },
    });
  }

  async enviarCorreoCompra(email, first_name, ticket) {
    try {
      const Opt = {
        from: "E-commerce<fedexx.cs@gmail.com",
        to: email,
        subject: "Compra exitosa",
        html: `
              <h2>Compra realizada con exito!</h2>
              <p>Gracias por tu compra ${first_name}</p>
              <p>El numero de orden de tu compra es #:${ticket}</p>
              <p>Una vez se apruebe el pago nos dispondremos a enviar los articulos</p>
              <h3>Muchas Gracias</h3>
            `,
      };
      await this.transporter.sendMail(Opt);
    } catch (error) {
      logger.error("Error al enviar Email:");
    }
  }

  async enviarCorreoRestableciminto(email, first_name, token) {
    const port = configObject.server.port;
    try {
      const Opt = {
        from: "E-commerce<fedexx.cs@gmail.com>",
        to: email,
        subject: "Restablecimiento de contraseña",
        html: `
                <p>Restablecimeinto de contraseña </p>
                <p>!olvidaste tu contraseña? estimado(a) ${first_name} </p>
                <p>Codigo de confirmacion: </p>
                <strong> ${token} </strong>
                <p>Este codigo expirara en una hora</p>
                <a href="http://localhost:8080/password">Restablecer contraseña</a>
            `,
      };
      await this.transporter.sendMail(Opt);
    } catch (error) {
      logger.error("Error al enviar el correo de restablecimiento");
    }
  }
}

module.exports = EmailManager;
