const ServiceBase = require("./ServiceBase");

class UsersService extends ServiceBase {


    constructor(opts) {
        super(opts)
        this.userModel = opts.userModel
        this.bcrypt = opts.bcrypt
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
        return await this.userModel.findOne({ email }, { require: true })
    }



    async find(id) {
        return await this.userModel.findById(id, { required: false })
    }

    async delete(id) {
        return await this.userModel.destroy({ id });
    }

}

module.exports = UsersService