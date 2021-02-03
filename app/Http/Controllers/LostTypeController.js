class LostTypeController {

    constructor({ lostTypeService, resHelper, locale }) {
        this.lostTypeService = lostTypeService
        this.resHelper = resHelper
        this.locale = locale
    }

    async index({ req, res, next }) {
        this.resHelper({ res, data: (await this.lostTypeService.getLostTypes()) })
    }

    async show({ req, res, next }) {
        this.resHelper({ res, data: (await this.lostTypeService.find(req.params.id)) })
    }

    async delete({ req, res, next }) {
        this.resHelper({ res, data: (await this.lostTypeService.delete(req.params.id)) })
    }

    async store({ req, res, next }) {
        const { name, description } = req.body
        this.resHelper({ res, data: (await this.lostTypeService.create({ name, description })) })
    }

    async update({ req, res, next }) {
        const { name, description } = req.body
        const lostType = await this.lostTypeService.getLostTypeByName({ name })
        if (!lostType) return this.resHelper({ res, status: 404, error: this.locale.translate("Item not found") })
        if (lostType.get('id') != req.params.id) return this.resHelper({
            res, status: 400,
            error: this.locale.translate("There is an existing type with name")
        })
        this.resHelper({ res, data: (await this.lostTypeService.update({ name, description }, req.params.id)) })
    }


}


module.exports = LostTypeController