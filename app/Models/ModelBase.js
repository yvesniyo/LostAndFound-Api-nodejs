const UserObserver = require("../Observers/UserObserver");
let { bookshelf } = require("../../config/database")
const Joi = require("joi")
const BookShelfModelBase = require('bookshelf-modelbase')(bookshelf)

class ModelBase extends BookShelfModelBase.extend({
    validation: null,
    requireFetch: false,
}) {

    observer = null

    constructor(params) {
        super(params)
        if (this.constructor == ModelBase) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    initialize() {
        this.on("saving", (user) => this.observer.saving(user));
        this.on("creating", (user) => this.observer.creating(user));
        this.on("created", (user) => this.observer.created(user));


        this.on("updating", (user) => this.observer.updating(user));
        this.on("updated", (user) => this.observer.updated(user));

        this.on("saved", (user) => this.observer.saved(user));

        this.on("destroying", (user) => this.observer.destroying(user));
        this.on("destroyed", (user) => this.observer.destroyed(user));


        this.on("fetching", (user) => this.observer.fetching(user));
        this.on("fetched", (user) => this.observer.fetched(user));

    }

}


module.exports = ModelBase