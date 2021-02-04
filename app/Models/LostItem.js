const ModelBase = require("./ModelBase")


class LostItem extends ModelBase {

    constructor(params) {
        super(params)
        this.observer = null
    }


    get requireFetch() {
        return false;
    }


    get tableName() {
        return "lost_items"
    }
}


module.exports = LostItem