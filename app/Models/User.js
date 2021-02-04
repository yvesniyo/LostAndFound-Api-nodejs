const ModelBase = require("./ModelBase");
const { bookshelf } = require("../../config/database");



class User extends ModelBase {

    constructor(params) {
        super(params)
        const AppContainer = require("../Helpers/app");
        this.observer = AppContainer("userObserver")
    }


    get requireFetch() {
        return false;
    }

    get hidden() {
        return [
            "password"
        ]
    }

    get tableName() {
        return "users"
    }

    get validate() {
        return null
    }

    get schema() {
        return [
        ]
    }




    getName() {
        return this.get("name")
    }

    role() {
        return this.belongsTo("Role")
    }

}





module.exports = bookshelf.model("User", User)