
const app = require("../Helpers/app");
const EventDispatcher = require("../Helpers/EventDispatcher");


class EventServiceProvider {


    events = {
        AppEventsUserCreatedEvent: [
            "AppListenersSendUserEmailVerification"
        ],
        UserUpdatedEvent: []
    }

    eventDispatcher = EventDispatcher

    constructor() {
    }



    register() {


        Object.keys(this.events).forEach((eventName, key) => {

            this.events[eventName].forEach(listener => {
                this.eventDispatcher.register(
                    app(eventName),
                    app(listener)
                )
            })

        })


    }

}


module.exports = EventServiceProvider