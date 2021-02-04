const ServiceBase = require("./ServiceBase");

class UsersService extends ServiceBase {


    constructor(opts) {
        super(opts)
        this.userModel = opts.userModel
        this.bcrypt = opts.bcrypt
        this.moment = opts.moment
    }

    async getAllUsers() {
        return await this.userModel.findAll()
    }

    async create({ email, name, password, phone, username, role_id }) {
        password = await this.bcrypt.hashData({ data: password })
        return await this.userModel.create({ email, name, username, password, phone, role_id })
    }

    async update(datas, id) {
        return await this.userModel.update(datas, { id });
    }

    async getUserByUsername({ email }) {
        return await this.userModel.findOne({ email }, { require: false })
    }
    async getUserByUsernameAndRole({ email, role_id }) {
        return await this.userModel.findOne({ email, role_id }, { require: false })
    }


    async find(id) {
        return await this.userModel.findById(id, { required: false })
    }

    async delete(id) {
        try {
            return await this.userModel.destroy({ id });
        } catch (error) {
            if (error.message == "No Rows Deleted") {
                return null;
            }
        }
    }



    async groupUsersByMonth(year = null) {
        if (!year) year = this.moment().year()

        const startofYear = this.moment()
            .year(year).startOf("year")
            .format("YYYY-MM-DD")
        const endofYear = this.moment()
            .year(year).endOf("year")
            .format("YYYY-MM-DD")

        const users = await this.userModel.forge()
            .where("created_at", ">=", startofYear)
            .where("created_at", "<=", endofYear)
            .fetch()
    }

}

module.exports = UsersService