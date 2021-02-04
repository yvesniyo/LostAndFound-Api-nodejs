class DashboardController {

    constructor({
        usersService,
        rolesService,
        lostTypeService, lostItemService,
        resHelper
    }) {
        this.usersService = usersService
        this.rolesService = rolesService
        this.lostItemService = lostItemService
        this.lostTypeService = lostTypeService
        this.resHelper = resHelper
    }

    async monitor({ req, res, next }) {

        const totalUsers = await this.usersService.totalUsers()
        const monthlyUsers = await this.usersService.monthlyUsers()
        const totalLostItems = await this.lostItemService.totalLostItems()
        const monthlyLostItems = await this.lostItemService.monthlyLostItems()

        return this.resHelper({
            res, data: {
                totalUsers,
                totalLostItems,
                monthlyLostItems,
                monthlyUsers
            }
        })
    }




}


module.exports = DashboardController