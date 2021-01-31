const mailTransporter = require("./MailTransporter");

class Mailer {

    constructor({
        email, cc, subject, message,
    }) {
        this.email = email;
        this.cc = cc || '';
        this.subject = subject;
        this.message = message;
    }

    send() {
        return new Promise((resolve, reject) => {
            const opts = {
                from: process.env.MAIL_TRANSPORTER_EMAIL,
                to: this.email,
                cc: this.cc,
                subject: this.subject,
                html: this.message,
            };

            mailTransporter.sendMail(opts, (err, info) => {
                if (err) reject(err);
                else resolve(info);
            });
        });
    }
}

module.exports = Mailer;