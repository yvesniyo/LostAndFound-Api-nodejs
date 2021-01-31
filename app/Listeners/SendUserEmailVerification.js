const SendMailJob = require("../Jobs/SendMailJob");
const ListenerBase = require("./ListenerBase")

class SendUserEmailVerification extends ListenerBase {


    constructor(opts) {
        super(opts);
    }


    async handle(event) {
        let user = event.user

        const email = user.get("email")
        const subject = "Email verifaction on " + process.env.APP_NAME
        const message = `Hi ${user.get("name")}, we would like you to verify that this email belong to you`;


        const job = SendMailJob.createJob({ email, subject, message });
        job.save();
        job.on('succeeded', (result) => {
            //console.log(result);
        });


    }


}


module.exports = SendUserEmailVerification