const { knex } = require("../../config/database");
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



    async totalUsers() {
        return await this.userModel.count()
    }

    async monthlyUsers(year = null) {
        if (!year) year = this.moment().year()

        const users = await this.userModel.forge()
            .where(knex.raw("YEAR(created_at) = ?", [year]))
            .query((q) => {
                q.select(knex.raw("count(*) as total_users, MONTH(created_at) as month"))
                q.groupBy(knex.raw("MONTH(created_at)"))
            })
            .fetchAll()
        return users
    }

}

module.exports = UsersService