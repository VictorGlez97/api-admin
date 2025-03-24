const postgre = require('../db/database');
const { transporter } = require('../helpers/mail');

const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path');

const portofolioController = {

    sendEmail: async( req, res ) => {
        try {
            
            const { name, mail, phone, message } = req.body;
            const data = req.body;

            console.log( __dirname );

            const pathTemplate = path.join(`${__dirname}`, '../', 'templates', 'email.html');
            const htmlTemplate = fs.readFileSync(pathTemplate, 'utf-8');
            
            const template = handlebars.compile(htmlTemplate);
            const htmlToSend = template(data);

            const mailOptions = {
                from: process.env.YAHOO_USER,
                to: process.env.EMAIL_SEND,
                subject: 'Llenado contacto portofolio',
                // text: `Se ha llenado el foemulario de contactos con los siguientes datos: <br/> Nombre: '${name}' <br/> Telefono: '${phone}' <br/> Correo: '${mail}' <br/><br/> El mensaje es el siguiente: '${message}'`
                html: htmlToSend
            }
        
            const info = await transporter.sendMail(mailOptions)

            console.log( info );

            if ( info.response === '250 OK , completed' ) {
                const { rows } = await postgre.query('INSERT INTO portofolio(name, mail, phone, message) VALUES($1, $2, $3, $4) RETURNING *', [name, mail, phone, message])
                if ( rows.length > 0 ) {
                    return res.status(200).json({ error: false, msg: 'Se envió el mensaje correctamente' })
                }
            }

            return res.status(402).json({ error: true, msg: 'No fue posible hacer el envio del mensaje' })

        } catch (error) {
            console.log( error );
            return res.status(500).json({ error: true, msg: error })
        }
    }

}

module.exports = portofolioController