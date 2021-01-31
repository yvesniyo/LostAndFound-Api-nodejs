const generateAccessToken = require("../../Helpers/GenerateToken");
const resHelper = require("../../Helpers/ResHelper")

class AuthController {

    constructor(opt) {
        this.authService = opt.authService
    }


    async login({ req, res, next }) {
        const { email, password } = req.query
        let user
        try {
            user = await this.authService.login({ email, password });
            const token = generateAccessToken(user.toJSON())
            if (user) {
                return resHelper({
                    res, data: {
                        token,
                        user
                    }, message: "User successfuly loged in"
                });
            }
        } catch (error) {
            console.log(error);
        }
        return resHelper({ res, status: 401, error: "Wrong username/email or password!" });
    }

    async register({ req, res, next }) {
        const { email, name, password, phone, username } = req.query
        const user = await this.authService.signup({ email, name, password, phone, username })
        return resHelper({ res, data: { user }, message: "Register succcess, wait while we send you email" });
    }

    me({ req, res, next }) {
        return resHelper({ data: req.user, res })
    }
}



module.exports = AuthController