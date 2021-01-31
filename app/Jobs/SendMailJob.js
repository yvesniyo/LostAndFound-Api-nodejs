const Queue = require('bee-queue');
const Mailer = require('../Helpers/Mailer');


const SendMailJobQueue = new Queue('sendMailJobQueu');

// Process jobs from as many servers or processes as you like
SendMailJobQueue.process(async (job, done) => {
    console.log(`Processing job ${job.id}`, "Sending email to " + job.data.email);

    const mailer = new Mailer({ email: job.data.email, subject: job.data.subject, message: job.data.message })
    try {
        await mailer.send()
    } catch (error) {
        return done(null, error);
    }

    return done(null, "Mail sent");



});

module.exports = SendMailJobQueue