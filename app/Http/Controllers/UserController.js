const app = require("../../Helpers/app");
const User = require("../../Models/User")


class UserController {


    constructor(opt) {
        this.usersService = opt.usersService
    }

    async getAllUsers({ req, res, next }) {
        const users = await this.usersService.getAllUsers();
        res.json(users)
    }

    async getSingleUser({ req, res, next }) {
        const user = await this.usersService.find(req.params.id);
        res.json(user)
    }
}


module.exports = UserController