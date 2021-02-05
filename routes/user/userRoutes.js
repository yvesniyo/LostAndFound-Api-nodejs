class UserRoutes {

    constructor({ express, userController, userItemRouter }) {
        this.router = express.Router()
        this.userController = userController
        this.userItemRouter = userItemRouter.fetch()
        this.register()
    }


    register() {

        this.router.use("/userItem", this.userItemRouter)
    }

    fetch() {

        return this.router
    }
}




module.exports = UserRoutes