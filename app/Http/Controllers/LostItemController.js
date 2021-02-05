class LostItemController {

    constructor({ lostItemService, resHelper }) {
        this.lostItemService = lostItemService
        this.resHelper = resHelper
    }

    async index({ req, res, next }) {
        const { limit, page } = req.query
        this.resHelper({ res, data: (await this.lostItemService.getLostItems({ limit, page })) })
    }

    async show({ req, res, next }) {
        this.resHelper({ res, data: (await this.lostItemService.find(req.params.id)) })
    }

    async delete({ req, res, next }) {
        this.resHelper({ res, data: (await this.lostItemService.delete(req.params.id)) })
    }

    async store({ req, res, next }) {
        const { lost_type, holder_name, card_no, dob, gender, description } = req.body
        this.resHelper({
            res,
            data: (await this.lostItemService.create({ lost_type, holder_name, card_no, dob, gender, description }))
        })
    }

    async update({ req, res, next }) {
        const { lost_type, holder_name, card_no, dob, gender, description } = req.body
        this.resHelper({
            res,
            data: (await this.lostItemService.update({ lost_type, holder_name, card_no, dob, gender, description }, req.params.id))
        })
    }

    async searchItems({ req, res, next }) {
        const { lost_type, q, columns } = req.query
        const lostItems = await this.lostItemService.search({ lost_type, q, columns })
        this.resHelper({ res, message: lostItems })
    }
}


module.exports = LostItemController