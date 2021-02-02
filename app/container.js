const { createContainer, listModules, Lifetime, asClass, asFunction, asValue, aliasTo, InjectionMode } = require('awilix');
const ApiRouter = require('../routes/ApiRouter');
const AuthRoutes = require('../routes/user/AuthRoutes');
const UserRoutes = require('../routes/user/UserRoutes');
const Hashr = require('./Helpers/Hashr');
const { registerValidator, loginValidator } = require("./Http/Validators/UserAuthValidator")
const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken");
// models
const Role = require('./Models/Role');
const User = require('./Models/User');
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
const generateAccessToken = require('./Helpers/GenerateToken');
const UserCreatedEvent = require('./Events/UserCreatedEvent');


const AppContainer = createContainer({
    injectionMode: InjectionMode.PROXY
})


AppContainer.loadModules([
    'app/Models/*.js',
    'app/Services/*.js',
    'app/Observers/*.js',
    'app/ServiceProvider/*.js',
    'app/Events/*.js',
    'app/Helpers/*.js',
    'app/Listeners/*.js',
    'app/Http/Middlewares/*.js',
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

AppContainer.register({


    AppModelsUser: asValue(User),
    userObserver: aliasTo("AppObserversUserObserver"),
    AppModelsRole: asValue(Role),
    roleModel: aliasTo("AppModelsRole"),
    userModel: aliasTo("AppModelsUser"),

    usersService: aliasTo("AppServicesUsersService"),
    authService: aliasTo("AppServicesAuthService"),

    userController: aliasTo("AppHttpControllersUserController"),
    authController: aliasTo("AppHttpControllersAuthController"),

    AppEventsUserCreatedEvent: asClass(UserCreatedEvent),
    userCreatedEvent: aliasTo("AppEventsUserCreatedEvent"),
    // UserCreatedEvent: aliasTo("userCreatedEvent"),
    // userUpdatedEvent: aliasTo("AppEventsUserUpdatedEvent"),
    // UserUpdatedEvent: aliasTo("AppEventsUpdatedEvent"),

    bcrypt: asClass(Hashr),
    resHelper: asValue(resHelper()),
    tokenExpireSeconds: asValue(process.env.TOKEN_EXPIRE_SECONDS || 86400),

    registerValidator: asFunction(registerValidator),
    loginValidator: asFunction(loginValidator),
    generateAccessToken: asFunction(generateAccessToken),

    router: asValue(router),
    express: asValue(express),
    jwt: asValue(jwt),
    cookieParser: asValue(cookieParser),
    cors: asValue(cors()),
    dotenv: asValue(dotenv),
    logger: asValue(logger),
    allRoutesLib: asValue(allRoutesLib),



    authRouter: asClass(AuthRoutes),
    userRouter: asClass(UserRoutes),
    apiRouter: asClass(ApiRouter),
    webRouter: asClass(WebRouter),
    mainRouter: asClass(MainRouter),


    // AppHttpMiddlewaresAuthenticateToken: asFunction(AuthenticateToken),
    authenticateToken: aliasTo("AppHttpMiddlewaresAuthenticateToken"),

    AppHelpersEventDispatcher: asClass(EventDispatcher).setLifetime(Lifetime.SINGLETON),
    eventDispatcher: aliasTo("AppHelpersEventDispatcher"),
    eventServiceProvider: aliasTo("AppServiceProviderEventServiceProvider"),

})


module.exports = AppContainer


