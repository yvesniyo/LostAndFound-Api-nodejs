const { bookshelf } = require("../../config/database");
const ModelBase = require("./ModelBase")


class Role extends ModelBase {

    constructor(params) {
        super(params)
        this.observer = null
    }

    users() {
        return this.hasMany("User")
    }

    get requireFetch() {
        return false;
    }

    get tableName() {
        return "roles"
    }
}


module.exports = bookshelf.model("Role", Role)