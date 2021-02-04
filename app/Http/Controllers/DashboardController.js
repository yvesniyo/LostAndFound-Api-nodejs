class DashboardController {

    constructor({
        usersService,
        rolesService,
        lostTypeService, lostItemService
    }) {
        this.usersService = usersService
        this.rolesService = rolesService
        this.lostItemService = lostItemService
        this.lostTypeService = lostTypeService
    }

    async monitor({ req, res, next }) {

    }


    async normalUsersChart({ req, res, next }) {
        const users = this.usersService.groupUsersByMonth();
    }


}


module.exports = DashboardController