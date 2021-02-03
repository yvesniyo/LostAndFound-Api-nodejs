const ServiceBase = require("./ServiceBase");

class LostTypeService extends ServiceBase {

    constructor(opts) {
        super(opts)
        const { lostTypeModel } = opts
        this.lostTypeModel = lostTypeModel
    }

    async getLostTypes() {
        return await this.lostTypeModel.findAll()
    }

    async create({ name, description }) {
        return await this.lostTypeModel.create({ name, description })
    }

    async update(datas, id) {
        try {
            return await this.lostTypeModel.update(datas, { id });
        } catch (error) {
            if (error.message == "EmptyResponse") {
                return null
            }
        }
    }

    async getLostTypeByName({ name }) {
        return await this.lostTypeModel.findOne({ name }, { require: false })
    }


    async find(id) {
        return await this.lostTypeModel.findById(id, { require: false })
    }

    async delete(id) {
        try {
            return await this.lostTypeModel.destroy({ id }, { require: false });
        } catch (error) {
            if (error.message == "No Rows Deleted") {
                return null;
            }
        }
    }



}


module.exports = LostTypeService