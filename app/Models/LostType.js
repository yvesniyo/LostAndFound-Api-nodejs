const ModelBase = require("./ModelBase")


class LostType extends ModelBase {

    constructor(params) {
        super(params)
        console.log("params ", params)
        this.observer = null
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