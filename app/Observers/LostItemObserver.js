class LostItemObserver {

    constructor(opts) {
        this.eventDispatcher = opts.eventDispatcher
        this.lostItemCreatedEvent = opts.lostItemCreatedEvent
    }


    saving(lostItem) {


    }

    creating(lostItem) {

    }

    updating(lostItem) {

    }

    created(lostItem) {
        this.lostItemCreatedEvent.setLostItem(lostItem)
        this.eventDispatcher.dispatch(this.lostItemCreatedEvent)
    }

    updated(lostItem) {

    }

    saved(lostItem) {

    }


    destroyed(lostItem) {

    }

    destroying(lostItem) {

    }

    fetching(lostItem) {
    }

    fetched(lostItem) {

    }
}


module.exports = LostItemObserver