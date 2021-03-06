class LostTypeRouter {

    constructor({
        express,
        lostTypeController,
        lostTypeCreateValidator,
        lostTypeUpdateValidator
    }) {

        this.router = express.Router()
        this.lostTypeController = lostTypeController
        this.lostTypeCreateValidator = lostTypeCreateValidator
        this.lostTypeUpdateValidator = lostTypeUpdateValidator
        this.register()
    }

    register() {

        this.router.route("/")
            .get((req, res, next) => this.lostTypeController.index({ req, res, next }))
            .post(this.lostTypeCreateValidator,
                (req, res, next) => this.lostTypeController.store({ req, res, next }))

        this.router.route("/:id")
            .get((req, res, next) => this.lostTypeController.show({ req, res, next }))
            .put(this.lostTypeUpdateValidator,
                (req, res, next) => this.lostTypeController.update({ req, res, next }))
            .delete((req, res, next) => this.lostTypeController.delete({ req, res, next }))

        this.router
    }

    fetch() {
        return this.router
    }
}





module.exports = LostTypeRouter