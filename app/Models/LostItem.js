const { bookshelf } = require("../../config/database");
const ModelBase = require("./ModelBase")


class LostItem extends ModelBase {

    constructor(params) {
        super(params)
        this.observer = null
    }

    lostType() {
        return this.belongsTo("LostType", "lost_type")
    }


    get requireFetch() {
        return false;
    }


    get tableName() {
        return "lost_items"
    }
}


module.exports = bookshelf.model("LostItem", LostItem)