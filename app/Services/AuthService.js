const ServiceBase = require("./ServiceBase");

class AuthService extends ServiceBase {

    constructor(opts) {
        super(opts)
        this.bcrypt = opts.bcrypt
        this.usersService = opts.usersService
    }

    async login({ email, password }) {
        let user = await this.usersService.getUserByUsername({ email });
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

    async signup({ email, name, password, phone, username }) {
        const role_id = 1
        return await this.usersService.create({ email, name, password, phone, username, role_id });
    }

    async forgetPassword({ email }) {

    }


    async resetPassword({ resetId, resetCode }) {

    }






}


module.exports = AuthService