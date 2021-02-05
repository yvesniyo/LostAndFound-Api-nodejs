const ListenerBase = require("./ListenerBase")
const SendMailJob = require("../Jobs/SendMailJob");


class NotifyUsersWhoLostItemListener extends ListenerBase {


    constructor(opts) {
        super(opts);
    }


    async handle(event) {
        let lostItem = event.getLostItem()

        const app = require("../Helpers/app");
        this.userItemService = app("userItemService")
        this.locale = app("locale")

        const userItems = (await this.userItemService.whereLostTypeAndCardNo({
            card_no: lostItem.get("card_no"),
            lost_type_id: lostItem.get("lost_type")
        })).toJSON()

        userItems.forEach(item => {
            const user = item.user
            const time_found = app("moment")(item.created_at).format("YYYY-MM-DD");

            const email = user.email
            const subject = "LostItem Found " + process.env.APP_NAME
            const message = this.locale.translate("mail.lostItemFound", {
                name: user.name,
                card_no: item.card_no,
                time_found: time_found,
            });

            const job = SendMailJob.createJob({ email, subject, message });
            job.save();
            job.on('succeeded', (result) => {
                //console.log(result);
            });
        })



    }



}


module.exports = NotifyUsersWhoLostItemListener