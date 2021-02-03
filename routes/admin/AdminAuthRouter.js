class AdminAuthRouter {

    constructor({
        express,
        loginValidator,
        registerValidator,
        authenticateAdmin,
        authController
    }) {

        this.router = express.Router()
        this.loginValidator = loginValidator
        this.registerValidator = registerValidator
        this.authenticateAdmin = authenticateAdmin
        this.authController = authController
        this.register()
    }

    register() {
        this.router.post(
            "/login",
            this.loginValidator,
            (req, res, next) => this.authController.loginAdmin({ req, res, next }))


        this.router.post(
            "/register",
            this.authenticateAdmin,
            this.registerValidator,
            (req, res, next) => this.authController.registerAdmin({ req, res, next }))


        this.router.get(
            "/me",
            this.authenticateAdmin,
            (req, res, next) => this.authController.me({ req, res, next }))
    }

    fetch() {
        return this.router
    }
}





module.exports = AdminAuthRouter