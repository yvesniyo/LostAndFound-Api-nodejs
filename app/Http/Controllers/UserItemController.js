class UserItemController {

    constructor({ userItemService, resHelper }) {
        this.userItemService = userItemService
        this.resHelper = resHelper
    }


    async index({ req, res, next }) {
        return this.resHelper({ res })
    }

    async show({ req, res, next }) {
        return this.resHelper({ res , data: (await this.userItemService.find(req.params.id)) })
    }

    async store({ req, res, next }) {
        const { lost_type_id, card_no, holder_name } = req.body
        const item = await this.userItemService.create({ lost_type_id, user_id: req.user.id, card_no, holder_name })
        return this.resHelper({ res, data: item })
    }

    async update({ req, res, next }) {
        const { lost_type_id, card_no, holder_name } = req.body
        const item = await this.userItemService.update({ lost_type_id, user_id: req.user.id, card_no, holder_name }, req.params.id)
        return this.resHelper({ res, data: item})
    }

    async delete({ req, res, next }) {
        return this.resHelper({ res, data: (await this.userItemService.delete(req.params.id) ) })
    }
}


module.exports = UserItemController
