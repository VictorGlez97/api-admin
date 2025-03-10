const postgre = require('../db/database');
const { transporter } = require('../helpers/mail');

const portofolioController = {

    sendEmail: async( req, res ) => {
        try {
            
            const { name, mail, phone, message } = req.body;

            const mailOptions = {
                from: process.env.YAHOO_USER,
                to: process.env.EMAIL_SEND,
                subject: 'Llenado contacto portofolio',
                text: `Se ha llenado el foemulario de contactos con los siguientes datos: <br/> Nombre: '${name}' <br/> Telefono: '${phone}' <br/> Correo: '${mail}' <br/><br/> El mensaje es el siguiente: '${message}'`
            }
        
            const info = await transporter.sendMail(mailOptions)

            // console.log( info );

            if ( info.response === '250 OK , completed' ) {
                const { rows } = await postgre.query('INSERT INTO portofolio(name, mail, phone, message) VALUES($1, $2, $3, $4) RETURNING *', [name, mail, phone, message])
                if ( rows.length > 0 ) {
                    return res.status(200).json({ error: false, msg: 'Se envió el mensaje correctamente' })
                }
            }

            return res.status(402).json({ error: true, msg: 'No fue posible hacer el envio del mensaje' })

        } catch (error) {
            return res.status(500).json({ error: true, msg: error.msg })
        }
    }

}

module.exports = portofolioController