class UserItemService {

    constructor({ userItemModel }) {
        this.userItemModel = userItemModel
    }


    async all() {
        return await this.userItemModel.findAll()
    }

    async create({ lost_type_id, user_id, card_no, holder_name }) {
        return await this.userItemModel.findOrCreate({ lost_type_id, user_id, card_no, holder_name })
    }


    async find(id) {
        return await this.userItemModel.findById(id, { require: false })
    }

    async update(datas, id) {
        const { lost_type_id, user_id, card_no, holder_name } = datas
        return await this.userItemModel.update({ lost_type_id, user_id, card_no, holder_name }, { id });
    }

    async delete(id) {
        try {
            return await this.userItemModel.destroy({ id });
        } catch (error) {
            if (error.message == "No Rows Deleted") {
                return null;
            }
        }
    }


    async whereLostTypeAndCardNo({ lost_type_id, card_no }) {
        return await this.userItemModel.forge()
            .where("lost_type_id", lost_type_id)
            .where("card_no", card_no)
            .fetchAll({ withRelated: ["user"] })
    }
}


module.exports = UserItemService