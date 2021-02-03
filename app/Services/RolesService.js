const ServiceBase = require("./ServiceBase");

class RolesService extends ServiceBase {

    constructor(opts) {
        super(opts)
        const { userModel, roleModel } = opts
        this.userModel = userModel
        this.roleModel = roleModel
    }

    async getAllRoles() {
        return await this.roleModel.findAll()
    }

    async createRole({ name }) {
        return await this.roleModel.create({ name })
    }

    async update(datas, id) {
        return await this.roleModel.update(datas, { id });
    }

    async getRoleByName({ name }) {
        return await this.roleModel.findOne({ name }, { require: false })
    }


    async find(id) {
        return await this.roleModel.findById(id, { required: false })
    }

    async delete(id) {
        try {
            return await this.roleModel.destroy({ id });
        } catch (error) {
            if (error.message == "No Rows Deleted") {
                return null;
            }
        }
    }



}


module.exports = RolesService