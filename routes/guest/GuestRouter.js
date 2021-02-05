class GuestRouter {

    constructor({ express, lostItemController }) {
        this.router = express.Router()
        this.lostItemController = lostItemController
        this.register()
    }


    register() {
        this.router.get("/lostItem/search",
            (req, res, next) => this.lostItemController.searchItems({ req, res, next }))

        this.router.get("/lostItem",
            (req, res, next) => this.lostItemController.index({ req, res, next }))
    }

    fetch() {
        return this.router
    }
}


module.exports = GuestRouter