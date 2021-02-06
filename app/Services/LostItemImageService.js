class LostItemImageService {

    constructor({ lostItemImageModel }) {
        this.lostItemImageModel = lostItemImageModel
    }

    async addImage({ lost_item_id, url }) {
        return await this.lostItemImageModel.create({ lost_item_id, url })
    }

    async lostItemImages({ lost_item_id }) {
        return await this.lostItemImageModel.forge()
            .where("lost_item_id", lost_item_id)
            .fetchAll()
    }

    async find(id) {
        return await this.lostItemImageModel.findById(id, { require: false })
    }

    async removeImage({ lost_item_id, lost_item_image_id }) {
        try {
            return await this.lostItemImageModel.destroy({ id: lost_item_image_id }, { require: false });
        } catch (error) {
            if (error.message == "No Rows Deleted") {
                return null;
            }
        }
    }

}


module.exports = LostItemImageService