const { bookshelf } = require("../../config/database");
const ModelBase = require("./ModelBase")


class LostType extends ModelBase {

    constructor(params) {
        super(params)
        this.observer = null
        const AppContainer = require("../Helpers/app");
        this.observer = AppContainer("lostItemObserver")
    }

    get requireFetch() {
        return false;
    }

    lostItems() {
        return this.hasMany("LostItem", "lost_type")
    }

    userItems() {
        return this.hasMany("UserItem")
    }


    get hidden() {
        return []
    }

    get tableName() {
        return "lost_types"
    }

    get validate() {
        return null
    }

    get schema() {
        return [
        ]
    }

}


module.exports = bookshelf.model("LostType", LostType)