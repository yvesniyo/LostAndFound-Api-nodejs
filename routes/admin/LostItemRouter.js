class LostItemRouter {

    constructor({
        express,
        lostItemController,
        lostItemUpdateValidator,
        lostItemCreateValidator
    }) {

        this.router = express.Router()
        this.lostItemController = lostItemController
        this.lostItemUpdateValidator = lostItemUpdateValidator
        this.lostItemCreateValidator = lostItemCreateValidator

        this.register()
    }

    register() {
        this.router.get(
            "/",
            (req, res, next) => this.lostItemController.index({ req, res, next }))


        this.router.route("/:id")
            .get(
                (req, res, next) => this.lostItemController.show({ req, res, next })
            )
            .put(
                this.lostItemUpdateValidator,
                (req, res, next) => this.lostItemController.update({ req, res, next })
            )
            .delete(
                (req, res, next) => this.lostItemController.delete({ req, res, next })
            )

        this.router.post(
            "/store",
            this.lostItemCreateValidator,
            (req, res, next) => this.lostItemController.store({ req, res, next }))
    }

    fetch() {
        return this.router
    }
}





module.exports = LostItemRouter