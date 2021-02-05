const EventBase = require("./EventBase");

class LostItemCreatedEvent extends EventBase {


    constructor(lostItem) {
        super()
        this.lostItem = lostItem
    }

    getLostItem() {
        return this.lostItem
    }

    setLostItem(lostItem) {
        this.lostItem = lostItem
    }


}



module.exports = LostItemCreatedEvent