const ModelBase = require("./ModelBase")


class Role extends ModelBase {

    constructor(params) {
        super(params)
        this.observer = null
    }

    get requireFetch() {
        return false;
    }

    get tableName() {
        return "roles"
    }
}


module.exports = Role