

class ApiRouter {

    constructor({ express, authRouter, adminAuthRouter, adminRouter, userRouter, resHelper }) {

        this.router = express.Router()
        this.authRouter = authRouter.fetch()
        this.userRouter = userRouter.fetch()
        this.adminRouter = adminRouter.fetch()
        this.adminAuthRouter = adminAuthRouter.fetch()
        this.resHelper = resHelper


        this.register()
    }

    async register() {

        // add routes here
        this.router.get("/", (req, res, next) => {
            this.resHelper({ res, message: "Welcome to our api!" })
        })


        //auth routers
        this.router.use("/auth/user", this.authRouter)
        this.router.use("/auth/admin", this.adminAuthRouter)

        //other main routes
        this.router.use("/admin", this.adminRouter)
        this.router.use("/user", this.userRouter)
    }


    fetch() {
        return this.router
    }
}




module.exports = ApiRouter