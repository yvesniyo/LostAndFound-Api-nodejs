class LostTypeRouter {

    constructor({
        express,
        authenticateAdmin,
        lostTypeController,
        lostTypeCreateValidator,
        lostTypeUpdateValidator
    }) {

        this.router = express.Router()
        this.authenticateAdmin = authenticateAdmin
        this.lostTypeController = lostTypeController
        this.lostTypeCreateValidator = lostTypeCreateValidator
        this.lostTypeUpdateValidator = lostTypeUpdateValidator
        this.register()
    }

    register() {

        this.router.get(
            "/",
            this.authenticateAdmin,
            (req, res, next) => this.lostTypeController.index({ req, res, next }))

        this.router.route("/:id")
            .get(
                this.authenticateAdmin,
                (req, res, next) => this.lostTypeController.show({ req, res, next })
            )
            .put(
                this.authenticateAdmin,
                this.lostTypeUpdateValidator,
                (req, res, next) => this.lostTypeController.update({ req, res, next })
            )
            .delete(
                this.authenticateAdmin,
                (req, res, next) => this.lostTypeController.delete({ req, res, next })
            )

        this.router.post(
            "/store",
            this.authenticateAdmin,
            this.lostTypeCreateValidator,
            (req, res, next) => this.lostTypeController.store({ req, res, next }))
    }

    fetch() {
        return this.router
    }
}





module.exports = LostTypeRouter