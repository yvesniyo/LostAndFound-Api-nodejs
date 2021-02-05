const { knex } = require("../../config/database");
const ServiceBase = require("./ServiceBase");

class LostItemService extends ServiceBase {

    constructor(opts) {
        super(opts)
        const { lostItemModel, moment, paginate, searchLimit } = opts
        this.lostItemModel = lostItemModel
        this.moment = moment
        this.paginate = paginate
        this.searchLimit = searchLimit
    }

    async getLostItems({ limit, page }) {
        const items = await this.lostItemModel.forge().fetchPage({
            pageSize: limit,
            page
        });
        return { limit, page, items };
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

    async yearLostItemsByType(year = null) {
        if (!year) year = this.moment().year()
        const lostItems = await this.lostItemModel.forge()
            .where(knex.raw("YEAR(lost_items.created_at) = ?", [year]))
            .query((q) => {
                q.innerJoin("lost_types", "lost_items.lost_type", "lost_types.id")
                q.select(knex.raw("count(*) total_losts, lost_types.name, lost_type"))
                q.groupBy("lost_type")
            })
            .fetchAll()
        return lostItems
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


    async search({ lost_type, q, columns }) {
        const tableColumns = ["card_no", "holder_name", "place_of_issue"]
        if (!q) return null
        let bindings = []
        let fullQuery = "";
        if (lost_type) fullQuery += `lost_type = ? AND (`; bindings.push(lost_type)
        let newColumns
        if (columns == "*" || !columns) newColumns = tableColumns
        else newColumns = columns.split(",")
        newColumns.forEach((column, index) => {
            if (index != 0 && index != (newColumns.length)) fullQuery += " OR "
            fullQuery += ` ${column} LIKE  ?`
            bindings.push(`%${q}%`)
        })
        if (lost_type) fullQuery += `)`;

        const items = await this.lostItemModel.forge()
            .query((query) => {
                query.whereRaw(fullQuery, bindings)
                query.limit(this.searchLimit)
            })
            .fetchAll()
        return items;

    }
}


module.exports = LostItemService