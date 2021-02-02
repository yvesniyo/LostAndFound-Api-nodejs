
class WebRouter {

    constructor({ express, resHelper }) {
        this.router = express.Router()
        this.resHelper = resHelper
        this.register()
    }

    register() {
        // add routes here
        this.router.get("/", (req, res, next) => {
            this.resHelper({ res, message: "Welcome to our web!" })
        })

    }


    fetch() {
        return this.router
    }

}





module.exports = WebRouter