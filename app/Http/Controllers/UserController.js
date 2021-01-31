const app = require("../../Helpers/app");
const resHelper = require("../../Helpers/ResHelper");
const User = require("../../Models/User")


class UserController {


    constructor(opt) {
        this.usersService = opt.usersService
    }

    async getAllUsers({ req, res, next }) {
        const users = await this.usersService.getAllUsers();
        resHelper({
            res,
            data: {
                loggedInUser: req.user,
                result: users,
            }
        })
    }

    async getSingleUser({ req, res, next }) {
        const user = await this.usersService.find(req.params.id);
        resHelper({
            res,
            data: {
                loggedInUser: req.user,
                result: user,
            }
        })
    }
}


module.exports = UserController