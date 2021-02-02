class EventServiceProvider {

    events = {
        AppEventsUserCreatedEvent: [
            "AppListenersSendUserEmailVerification"
        ],
        UserUpdatedEvent: []
    }


    constructor(opts) {
        this.opts = opts
        this.eventDispatcher = opts.eventDispatcher

    }


    register() {

        Object.keys(this.events).forEach((eventName, key) => {
            this.events[eventName].forEach(listener => {
                this.eventDispatcher.register(
                    this.opts[eventName],
                    this.opts[listener]
                )
            })
        })


    }

}


module.exports = EventServiceProvider