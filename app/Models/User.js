const Role = require("./Role");
const ModelBase = require("./ModelBase");



class User extends ModelBase {

    constructor(params) {
        super(params)
        const AppContainer = require("../Helpers/app");
        this.observer = AppContainer("userObserver")
    }

    get require() {
        return 0;
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
        return this.belongsTo(Role)
    }

}





module.exports = User