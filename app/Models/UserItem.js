const { bookshelf } = require("../../config/database");
const ModelBase = require("./ModelBase");

class UserItem extends ModelBase {

    constructor(params) {
        super(params)

    }


    user() {
        return this.belongsTo("User")
    }

    lostType() {
        return this.belongsTo("LostType")
    }

    get requireFetch() {
        return false;
    }

    get hidden() {
        return []
    }

    get tableName() {
        return "user_items"
    }

    get validate() {
        return null
    }

    get schema() {
        return [
        ]
    }
}

module.exports = bookshelf.model("UserItem", UserItem)