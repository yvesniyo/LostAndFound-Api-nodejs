
const { createTransport } = require('nodemailer');

const mailTransporter = createTransport({
    host: process.env.MAIL_TRANSPORTER_HOST,
    port: process.env.MAIL_TRANSPORTER_PORT,
    greetingTimeout: process.env.MAIL_TRANSPORTER_GREETING_TIMEOUT,
    secureConnection: eval(process.env.MAIL_TRANSPORTER_SECURE_CONNECTION),
    auth: {
        user: process.env.MAIL_TRANSPORTER_USER,
        pass: process.env.MAIL_TRANSPORTER_PASS,
    },
});


module.exports = mailTransporter