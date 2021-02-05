

class ApiRouter {

    constructor({ express, authenticateNormalUser,
        authenticateAdmin, authRouter, adminAuthRouter,
        adminRouter, userRouter, guestRouter,
        resHelper }) {
        this.router = express.Router()
        this.authRouter = authRouter.fetch()
        this.userRouter = userRouter.fetch()
        this.adminRouter = adminRouter.fetch()
        this.adminAuthRouter = adminAuthRouter.fetch()
        this.resHelper = resHelper
        this.authenticateNormalUser = authenticateNormalUser
        this.authenticateAdmin = authenticateAdmin
        this.guestRouter = guestRouter.fetch()
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

        //Admin routes
        this.router.use("/admin", this.authenticateAdmin)
        this.router.use("/admin", this.adminRouter)

        //user routes
        this.router.use("/user", this.authenticateNormalUser)
        this.router.use("/user", this.userRouter)

        //guest router 
        this.router.use("/guest", this.guestRouter)
    }


    fetch() {
        return this.router
    }
}




module.exports = ApiRouter