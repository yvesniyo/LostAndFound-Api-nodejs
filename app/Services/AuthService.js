const ServiceBase = require("./ServiceBase");

class AuthService extends ServiceBase {

    constructor(opts) {
        super(opts)
        this.bcrypt = opts.bcrypt
        this.usersService = opts.usersService
    }

    async login({ email, password, role_id }) {
        let user = await this.usersService.getUserByUsernameAndRole({ email, role_id });
        if (!user)
            return false;
        let passwordMatches = await this.bcrypt.compareHashToPlain({
            plain: password,
            hash: user.get("password")
        });

        if (passwordMatches)
            return user

        return false
    }

    async signup({ email, name, password, phone, username, role_id }) {
        return await this.usersService.create({ email, name, password, phone, username, role_id });
    }

    async forgetPassword({ email }) {

    }


    async resetPassword({ resetId, resetCode }) {

    }

}


module.exports = AuthService