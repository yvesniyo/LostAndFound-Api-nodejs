class UserRoutes {

    constructor({ express, userController }) {
        this.router = express.Router()
        this.userController = userController
        this.register()
    }


    register() {
        this.router.get("/all",
            (req, res, next) => this.userController.getAllUsers({ req, res, next }))
        this.router.get("/:id",
            (req, res, next) => this.userController.getSingleUser({ req, res, next }))
    }

    fetch() {
        return this.router
    }
}




module.exports = UserRoutes