const EventBase = require("./EventBase");

class UserUpdatedEvent extends EventBase {

    user

    constructor(user) {
        this.user = user
    }


}



module.exports = UserUpdatedEvent