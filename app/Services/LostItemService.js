const { knex } = require("../../config/database");
const ServiceBase = require("./ServiceBase");

class LostItemService extends ServiceBase {

    constructor(opts) {
        super(opts)
        const { lostItemModel, moment } = opts
        this.lostItemModel = lostItemModel
        this.moment = moment
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

    async totalLostItems() {
        return await this.lostItemModel.count()
    }

    async monthlyLostItems(year = null) {
        if (!year) year = this.moment().year()
        const items = await this.lostItemModel
            .where(knex.raw("YEAR(created_at) = ?", [year]))
            .query((q) => {
                q.groupBy(knex.raw("MONTH(created_at)"))
                q.select(knex.raw("count(*) as items_count, MONTH(created_at) as month"))
            })
            .fetchAll()
        return items;
    }

}


module.exports = LostItemService