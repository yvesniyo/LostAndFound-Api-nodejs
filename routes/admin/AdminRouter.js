class AdminRouter {

    constructor({
        express,
        lostTypeRouter,
        lostItemRouter,
        authenticateAdmin,
        dashboardRouter }) {

        this.router = express.Router()
        this.authenticateAdmin = authenticateAdmin
        this.lostTypeRouter = lostTypeRouter.fetch()
        this.lostItemRouter = lostItemRouter.fetch()
        this.dashboardRouter = dashboardRouter.fetch()
        this.register()
    }

    register() {
        //all admin routes
        this.router.use("/", this.dashboardRouter)
        this.router.use("/lostType", this.lostTypeRouter)
        this.router.use("/lostItem", this.lostItemRouter)

    }

    fetch() {
        return this.router
    }
}





module.exports = AdminRouter