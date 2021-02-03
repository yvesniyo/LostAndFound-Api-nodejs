class LostItemRouter {

    constructor({
        express,
        authenticateAdmin,
        lostItemController,
        lostItemUpdateValidator,
        lostItemCreateValidator
    }) {

        this.router = express.Router()
        this.authenticateAdmin = authenticateAdmin
        this.lostItemController = lostItemController
        this.lostItemUpdateValidator = lostItemUpdateValidator
        this.lostItemCreateValidator = lostItemCreateValidator

        this.register()
    }

    register() {
        this.router.get(
            "/",
            this.authenticateAdmin,
            (req, res, next) => this.lostItemController.index({ req, res, next }))


        this.router.route("/:id")
            .get(
                this.authenticateAdmin,
                (req, res, next) => this.lostItemController.show({ req, res, next })
            )
            .put(
                this.authenticateAdmin,
                this.lostItemUpdateValidator,
                (req, res, next) => this.lostItemController.update({ req, res, next })
            )
            .delete(
                this.authenticateAdmin,
                (req, res, next) => this.lostItemController.delete({ req, res, next })
            )

        this.router.post(
            "/store",
            this.authenticateAdmin,
            this.lostItemCreateValidator,
            (req, res, next) => this.lostItemController.store({ req, res, next }))
    }

    fetch() {
        return this.router
    }
}





module.exports = LostItemRouter