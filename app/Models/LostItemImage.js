const ModelBase = require("./ModelBase");
const { bookshelf } = require("../../config/database");

class LostItemImage extends ModelBase {

    constructor(params) {
        super(params)

        this.observer = null
    }


    lostItem() {
        return this.belongsTo("LostItem")
    }


    tableName() {
        return "lost_item_images"
    }


    get hidden() {
        return []
    }


    get requireFetch() {
        return false;
    }

    get validate() {
        return null
    }

    get schema() {
        return [
        ]
    }


}

module.exports = bookshelf.model("LostItemImage", LostItemImage)