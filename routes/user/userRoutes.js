class UserRoutes {

    constructor({ express, userController, authenticateNormalUser }) {
        this.router = express.Router()
        this.userController = userController
        this.authenticateNormalUser = authenticateNormalUser
        this.register()
    }


    register() {
        this.router.get("/all",
            this.authenticateNormalUser,
            (req, res, next) => this.userController.getAllUsers({ req, res, next }))
        this.router.get("/:id",
            this.authenticateNormalUser,
            (req, res, next) => this.userController.getSingleUser({ req, res, next }))
    }

    fetch() {
        return this.router
    }
}




module.exports = UserRoutes