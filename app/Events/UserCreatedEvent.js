const EventBase = require("./EventBase");

class UserCreatedEvent extends EventBase {


    constructor(user) {
        super()
        this.user = user
    }

    getUser() {
        return this.user
    }

    setUser(user) {
        this.user = user
    }


}



module.exports = UserCreatedEvent