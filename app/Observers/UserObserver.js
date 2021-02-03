class UserObserver {

    constructor(opts) {
        this.eventDispatcher = opts.eventDispatcher
        this.userCreatedEvent = opts.userCreatedEvent
    }

    saving(user) {


    }

    creating(user) {

    }

    updating(user) {

    }

    created(user) {
        this.userCreatedEvent.setUser(user)
        this.eventDispatcher.dispatch(this.userCreatedEvent)
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