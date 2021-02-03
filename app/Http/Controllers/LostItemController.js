class LostItemController {

    constructor({ lostItemService, resHelper }) {
        this.lostItemService = lostItemService
        this.resHelper = resHelper
    }

    async index({ req, res, next }) {
        this.resHelper({ res, data: (await this.lostItemService.getLostItems()) })
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
}


module.exports = LostItemController