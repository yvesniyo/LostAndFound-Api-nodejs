class UserItemRouter {

    constructor({ express, userItemController, userItemUpdateValidator, userItemCreateValidator }) {
        this.router = express.Router()
        this.userItemController = userItemController
        this.userItemCreateValidator = userItemCreateValidator
        this.userItemUpdateValidator = userItemUpdateValidator
        this.register()
    }


    register() {
        this.router.route("/")
            .get((req, res, next) => this.userItemController.index({ req, res, next }))
            .post(this.userItemCreateValidator, (req, res, next) => this.userItemController.store({ req, res, next }))

        this.router.route("/:id")
            .get((req, res, next) => this.userItemController.show({ req, res, next }))
            .put(this.userItemUpdateValidator, (req, res, next) => this.userItemController.update({ req, res, next }))
            .delete((req, res, next) => this.userItemController.delete({ req, res, next }))

    }


    fetch() {
        return this.router
    }

}

module.exports = UserItemRouter