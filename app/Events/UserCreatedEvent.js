const EventBase = require("./EventBase");

class UserCreatedEvent extends EventBase {


    constructor(user) {
        super()
        this.user = user
    }


}



module.exports = UserCreatedEvent