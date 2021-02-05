class UserController {


    constructor({ usersService, resHelper }) {
        this.usersService = usersService
        this.resHelper = resHelper

    }

    async getAllUsers({ req, res, next }) {
        const { limit, page } = req.query
        const users = await this.usersService.getAllUsers({ limit, page });
        this.resHelper({
            res,
            data: {
                loggedInUser: req.user,
                result: users,
            }
        })
    }

    async getSingleUser({ req, res, next }) {
        const user = await this.usersService.find(req.params.id);
        this.resHelper({
            res,
            data: {
                loggedInUser: req.user,
                result: user,
            }
        })
    }
}


module.exports = UserController