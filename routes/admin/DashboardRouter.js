class DashboardRouter {

    constructor({ express, dashboardController }) {
        this.router = express.Router()
        this.dashboardController = dashboardController
        this.register();
    }

    register() {
        this.router.get("/",
            ({ req, res, next }) => this.dashboardController.monitor({ req, res, next }))
    }


    fetch() {
        return this.router
    }
}

module.exports = DashboardRouter