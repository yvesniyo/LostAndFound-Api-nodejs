const ServiceBase = require("./ServiceBase");

class LostItemService extends ServiceBase {

    constructor(opts) {
        super(opts)
        const { lostItemModel } = opts
        this.lostItemModel = lostItemModel
    }

    async getLostItems() {
        return await this.lostItemModel.findAll()
    }

    async create(
        {
            lost_type,
            holder_name,
            holder_place_of_birth,
            place_of_issue,
            card_no,
            dob,
            gender,
            description,
            status = "Processing"
        }) {
        return await this.lostItemModel.create(
            {
                lost_type,
                holder_name,
                holder_place_of_birth,
                place_of_issue,
                card_no,
                dob,
                gender,
                description,
                status
            })
    }

    async update(datas, id) {
        return await this.lostItemModel.update(datas, { id });
    }

    async getLostItemByName({ name }) {
        return await this.lostItemModel.findOne({ name }, { require: false })
    }


    async find(id) {
        return await this.lostItemModel.findById(id, { require: false })
    }

    async delete(id) {
        try {
            return await this.lostItemModel.destroy({ id });
        } catch (error) {
            if (error.message == "No Rows Deleted") {
                return null;
            }
        }
    }

}


module.exports = LostItemService