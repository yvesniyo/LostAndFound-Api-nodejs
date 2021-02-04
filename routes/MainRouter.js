class MainRouter {

    constructor({ express, apiRouter, webRouter }) {
        this.router = express.Router()
        this.apiRouter = apiRouter.fetch()
        this.webRouter = webRouter.fetch()

        this.register()
    }

    register() {
        this.router.use("/api/v1", this.apiRouter)
        this.router.use("/", this.webRouter)
    }

    fetch() {
        return this.router
    }
}

module.exports = MainRouter