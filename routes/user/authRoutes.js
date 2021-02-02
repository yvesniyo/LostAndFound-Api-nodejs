class AuthRoutes {

    constructor({ express,
        loginValidator,
        registerValidator,
        authenticateToken,
        authController }) {

        this.router = express.Router()
        this.loginValidator = loginValidator
        this.registerValidator = registerValidator
        this.authenticateToken = authenticateToken
        this.authController = authController
        this.register()
    }

    register() {
        this.router.get(
            "/login",
            this.loginValidator,
            (req, res, next) => this.authController.login({ req, res, next }))


        this.router.get(
            "/register",
            this.registerValidator,
            (req, res, next) => this.authController.register({ req, res, next }))


        this.router.get(
            "/me",
            this.authenticateToken,
            (req, res, next) => this.authController.me({ req, res, next }))
    }

    fetch() {
        return this.router
    }
}





module.exports = AuthRoutes