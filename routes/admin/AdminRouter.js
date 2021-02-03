class AdminRouter {

    constructor({
        express,
        lostTypeRouter,
        lostItemRouter,
        authenticateAdmin,
        authenticateToken }) {

        this.router = express.Router()
        this.authenticateToken = authenticateToken
        this.authenticateAdmin = authenticateAdmin
        this.lostTypeRouter = lostTypeRouter.fetch()
        this.lostItemRouter = lostItemRouter.fetch()
        this.register()
    }

    register() {
        this.router.use("/lostType", this.lostTypeRouter)
        this.router.use("/lostItem", this.lostItemRouter)

    }

    fetch() {
        return this.router
    }
}





module.exports = AdminRouter