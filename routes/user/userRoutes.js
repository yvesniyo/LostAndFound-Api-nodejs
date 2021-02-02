class UserRoutes {

    constructor({ express, userController, authenticateToken }) {
        this.router = express.Router()
        this.userController = userController
        this.authenticateToken = authenticateToken
        this.register()
    }


    register() {
        this.router.get("/all",
            this.authenticateToken,
            (req, res, next) => this.userController.getAllUsers({ req, res, next }))
        this.router.get("/:id",
            this.authenticateToken,
            (req, res, next) => this.userController.getSingleUser({ req, res, next }))
    }

    fetch() {
        return this.router
    }
}




module.exports = UserRoutes