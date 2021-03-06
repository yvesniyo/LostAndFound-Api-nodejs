class AuthRoutes {

    constructor({ express,
        loginValidator,
        registerValidator,
        authenticateNormalUser,
        authController }) {

        this.router = express.Router()
        this.loginValidator = loginValidator
        this.registerValidator = registerValidator
        this.authenticateNormalUser = authenticateNormalUser
        this.authController = authController
        this.register()
    }

    register() {
        this.router.post(
            "/login",
            this.loginValidator,
            (req, res, next) => this.authController.login({ req, res, next }))


        this.router.post(
            "/register",
            this.registerValidator,
            (req, res, next) => this.authController.register({ req, res, next }))


        this.router.get(
            "/me",
            this.authenticateNormalUser,
            (req, res, next) => this.authController.me({ req, res, next }))
    }

    fetch() {
        return this.router
    }
}





module.exports = AuthRoutes