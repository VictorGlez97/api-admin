const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Yahoo',
    auth: {
        user: process.env.YAHOO_USER,
        pass: process.env.YAHOO_PASS
    }
});

module.exports = { transporter };