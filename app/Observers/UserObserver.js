const EventDispatcher = require("../Helpers/EventDispatcher")
const UserCreatedEvent = require("../Events/UserCreatedEvent")

class UserObserver {

    constructor() {

    }

    saving(user) {


    }

    creating(user) {

    }

    updating(user) {

    }

    created(user) {
        console.log("user created in UserObserver")
        EventDispatcher.dispatch(new UserCreatedEvent(user))
    }

    updated(user) {

    }

    saved(user) {

    }


    destroyed(user) {

    }

    destroying(user) {

    }

    fetching(user) {
    }

    fetched(user) {

    }
}


module.exports = UserObserver