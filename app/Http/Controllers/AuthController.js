class AuthController {

    constructor({
        authService,
        generateAccessToken,
        tokenExpireSeconds,
        resHelper }) {

        this.authService = authService
        this.generateAccessToken = generateAccessToken
        this.tokenExpireSeconds = tokenExpireSeconds
        this.resHelper = resHelper
    }


    async login({ req, res, next }) {
        const { email, password } = req.query
        let user
        try {
            user = await this.authService.login({ email, password });
            const token = this.generateAccessToken(user.toJSON(), this.tokenExpireSeconds)
            if (user) {
                return this.resHelper({
                    res,
                    data: {
                        token,
                        user
                    },
                    message: "User successfuly loged in"
                });
            }
        } catch (error) {
            console.log(error);
        }
        return this.resHelper({ res, status: 401, error: "Wrong username/email or password!" });
    }

    async register({ req, res, next }) {
        const { email, name, password, phone, username } = req.query
        const user = await this.authService.signup({ email, name, password, phone, username })
        return this.resHelper({ res, data: { user }, message: "Register succcess, wait while we send you email" });
    }

    me({ req, res, next }) {
        return this.resHelper({ data: req.user, res })
    }
}



module.exports = AuthController