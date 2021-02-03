class AuthController {

    constructor({
        authService,
        generateAccessToken,
        tokenExpireSeconds,
        resHelper, locale }) {

        this.authService = authService
        this.generateAccessToken = generateAccessToken
        this.tokenExpireSeconds = tokenExpireSeconds
        this.resHelper = resHelper
        this.locale = locale
    }


    async login({ req, res, next }) {
        const { email, password } = req.body
        let role_id = 3
        if (req.loginAsAdmin) role_id = 1
        try {
            const user = await this.authService.login({ email, password, role_id });
            if (!user) return this.resHelper({ res, status: 401, error: this.locale.translate("Wrong username/email or password!") });
            const token = this.generateAccessToken(user.toJSON(), this.tokenExpireSeconds)
            if (user) return this.resHelper({ res, data: { token, user }, message: this.locale.translate("User successfuly loged in") })
        } catch (error) {
            return this.resHelper({ res, status: 500, error: error.message });
        }
        return this.resHelper({ res, status: 401, error: this.locale.translate("Wrong username/email or password!") });
    }

    async loginAdmin({ req, res, next }) {
        req.loginAsAdmin = true
        return this.login({ req, res, next });
    }

    async register({ req, res, next }) {
        const { email, name, password, phone, username } = req.body
        let role_id = 3
        if (req.registerAsAdmin) role_id = 1
        const user = await this.authService.signup({ email, name, password, phone, username, role_id })
        return this.resHelper({ res, data: { user }, message: this.locale.translate("Register succcess, wait while we send you email") });
    }

    async registerAdmin({ req, res, next }) {
        req.registerAsAdmin = true
        return this.register({ req, res, next });
    }

    me({ req, res, next }) {
        return this.resHelper({ data: req.user, res })
    }
}



module.exports = AuthController