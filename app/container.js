const { createContainer, listModules, Lifetime, asClass, asFunction, asValue, aliasTo, InjectionMode } = require('awilix');
const ApiRouter = require('../routes/ApiRouter');
const AuthRoutes = require('../routes/user/AuthRoutes');
const UserRoutes = require('../routes/user/UserRoutes');
const Hashr = require('./Helpers/Hashr');
const { registerValidator, loginValidator } = require("./Http/Validators/UserAuthValidator")
const { lostItemCreateValidator, lostItemUpdateValidator } = require('./Http/Validators/LostItemValidator');
const { lostTypeCreateValidator, lostTypeUpdateValidator } = require("./Http/Validators/LostTypeValidator")
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken");


const resHelper = require('./Helpers/ResHelper');
const WebRouter = require('../routes/WebRouter');
const MainRouter = require('../routes/MainRouter');
const EventDispatcher = require('./Helpers/EventDispatcher');


//external
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const allRoutesLib = require('express-list-endpoints');
const dotenv = require('dotenv');
const moment = require("moment");
const generateAccessToken = require('./Helpers/GenerateToken');
const UserCreatedEvent = require('./Events/UserCreatedEvent');
const AdminAuthRouter = require('../routes/admin/AdminAuthRouter');
const AdminRouter = require('../routes/admin/AdminRouter');
const LostTypeRouter = require('../routes/admin/LostTypeRouter');
const LostItemRouter = require('../routes/admin/LostItemRouter');
const LocaleService = require('./Services/LocaleService');
const i18n = require('../config/i18n.config');


const AppContainer = createContainer({
    injectionMode: InjectionMode.PROXY
})

// load all the ./app modules
AppContainer.loadModules([
    [
        'app/Models/*.js',
        { register: asValue }
    ],
    'app/Services/*.js',
    'app/Observers/*.js',
    'app/ServiceProvider/*.js',
    'app/Events/*.js',
    'app/Helpers/*.js',
    'app/Listeners/*.js',
    [
        'app/Http/Middlewares/*.js',
        {
            register: asFunction
        }
    ],
    [
        'app/Http/validators/*.js',
        {
            register: asFunction
        }
    ],
    'app/Http/Controllers/*.js',
], {
    formatName: (name, descriptor) => {
        const splat = descriptor.path.split('\\')
        let startIndex = 3;
        splat.forEach((dir, index) => {
            if (dir == "app") {
                startIndex = (splat.length) - (index);
            }
        })
        let fullName = "";
        for (i = startIndex; i >= 1; i--) {
            fullName = fullName + "" + splat[splat.length - i]
        }
        fullName = fullName.replace(".js", "").replace("/app", "app");
        fullName = fullName.charAt(0).toUpperCase() + fullName.substring(1);
        return fullName;
    },
});


//register modals
AppContainer.register({
    userObserver: aliasTo("AppObserversUserObserver"),
    roleModel: aliasTo("AppModelsRole"),
    userModel: aliasTo("AppModelsUser"),
    lostTypeModel: aliasTo("AppModelsLostType"),
    lostItemModel: aliasTo("AppModelsLostItem"),
})

// register services
AppContainer.register({
    usersService: aliasTo("AppServicesUsersService"),
    authService: aliasTo("AppServicesAuthService"),
    rolesService: aliasTo("AppServicesRolesService"),
    lostTypeService: aliasTo("AppServicesLostTypeService"),
    lostItemService: aliasTo("AppServicesLostItemService"),
})


//register controllers
AppContainer.register({
    userController: aliasTo("AppHttpControllersUserController"),
    authController: aliasTo("AppHttpControllersAuthController"),
    lostItemController: aliasTo("AppHttpControllersLostItemController"),
    lostTypeController: aliasTo("AppHttpControllersLostTypeController"),
})


//register events
AppContainer.register({
    AppEventsUserCreatedEvent: asClass(UserCreatedEvent),
    userCreatedEvent: aliasTo("AppEventsUserCreatedEvent"),
})


//register validators
AppContainer.register({
    registerValidator: asFunction(registerValidator),
    loginValidator: asFunction(loginValidator),
    lostTypeUpdateValidator: asFunction(lostTypeUpdateValidator),
    lostTypeCreateValidator: asFunction(lostTypeCreateValidator),
    lostItemUpdateValidator: asFunction(lostItemUpdateValidator),
    lostItemCreateValidator: asFunction(lostItemCreateValidator)
})


//register app dependencies
AppContainer.register({
    router: asValue(router),
    express: asValue(express),
    jwt: asValue(jwt),
    cookieParser: asValue(cookieParser),
    cors: asValue(cors()),
    dotenv: asValue(dotenv),
    logger: asValue(logger),
    allRoutesLib: asValue(allRoutesLib),
    moment: asValue(moment),
})



//register routers
AppContainer.register({
    authRouter: asClass(AuthRoutes),
    userRouter: asClass(UserRoutes),
    apiRouter: asClass(ApiRouter),
    webRouter: asClass(WebRouter),
    mainRouter: asClass(MainRouter),
    adminRouter: asClass(AdminRouter),
    lostTypeRouter: asClass(LostTypeRouter),
    lostItemRouter: asClass(LostItemRouter),
    adminAuthRouter: asClass(AdminAuthRouter),
});

//register middleware
AppContainer.register({
    generateAccessToken: asFunction(generateAccessToken),
    authenticateToken: aliasTo("AppHttpMiddlewaresAuthenticateToken"),
    authenticateAdmin: aliasTo("AppHttpMiddlewaresAuthenticateAdmin"),
    authenticateNormalUser: aliasTo("AppHttpMiddlewaresAuthenticateNormalUser"),
})

//register helpers
AppContainer.register({
    bcrypt: asClass(Hashr),
    resHelper: asValue(resHelper()),
    AppHelpersEventDispatcher: asClass(EventDispatcher).setLifetime(Lifetime.SINGLETON),
    eventDispatcher: aliasTo("AppHelpersEventDispatcher"),
})

//register service providers
AppContainer.register({
    eventServiceProvider: aliasTo("AppServiceProviderEventServiceProvider"),
})


//register uncategorized 
AppContainer.register({
    tokenExpireSeconds: asValue(process.env.TOKEN_EXPIRE_SECONDS || 86400),
})

AppContainer
    .register({
        localeService: asClass(LocaleService, { lifetime: Lifetime.SINGLETON }),
        locale: aliasTo("localeService")
    })
    .register({
        i18nProvider: asValue(i18n)
    });



module.exports = AppContainer


