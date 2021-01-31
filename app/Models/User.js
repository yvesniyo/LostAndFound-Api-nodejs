const Joi = require("joi")
const Role = require("./Role");
const UserObserver = require("../Observers/UserObserver");
const ModelBase = require("./ModelBase");

class User extends ModelBase {

    constructor(params) {
        super(params)
        this.observer = new UserObserver()
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