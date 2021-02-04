const ModelBase = require("./ModelBase")


class LostType extends ModelBase {

    constructor(params) {
        super(params)
        this.observer = null
    }

    get requireFetch() {
        return false;
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


module.exports = LostType