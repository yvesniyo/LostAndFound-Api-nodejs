

class ApiRouter {

    constructor({ express, authRouter, userRouter, resHelper }) {

        this.router = express.Router()
        this.authRouter = authRouter.fetch()
        this.userRouter = userRouter.fetch()
        this.resHelper = resHelper


        this.register()
    }

    async register() {

        // add routes here
        this.router.get("/", (req, res, next) => {
            this.resHelper({ res, message: "Welcome to our api!" })
        })

        this.router.use("/auth/user", this.authRouter)
        this.router.use("/user", this.userRouter)
    }


    fetch() {
        return this.router
    }
}




module.exports = ApiRouter