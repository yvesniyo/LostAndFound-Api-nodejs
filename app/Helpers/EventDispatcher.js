const Concert = require("concert")
const EventBase = require("../Events/EventBase")
const ListenerBase = require("../Listeners/ListenerBase")


class EventDispatcher {


    constructor() {
        this.dispatcher = new Concert
    }


    register(event, listener) {
        if (!(listener instanceof ListenerBase)) {
            throw new Error("Listener must extends the ListenerBase Class")
        }
        if (event instanceof EventBase) {
            // console.log("Listening on event =", event.constructor.name)
            this.dispatcher.on(event.constructor.name, listener.handle)
        } else {
            throw new Error("Event must extends the EventBase Class")
        }
    }

    dispatch(event) {
        if (event instanceof EventBase) {
            // console.log("Dispatching event =", event.constructor.name, event)
            this.dispatcher.trigger(event.constructor.name, event)
        } else {
            throw new Error("Event must extends the EventBase Class")
        }
    }
}


module.exports = EventDispatcher
