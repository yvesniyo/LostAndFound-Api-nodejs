let { bookshelf } = require("../../config/database")
const ModelBase = require("./ModelBase")


class Role extends ModelBase {

    constructor(params) {
        super(params)
        this.observer = null
    }


    get tableName() {
        return "roles"
    }
}


module.exports = Role