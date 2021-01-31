const { createContainer, Lifetime, asClass, asFunction, asValue, aliasTo, InjectionMode } = require('awilix');
const Hashr = require('./Helpers/Hashr');
const { registerValidator, loginValidator } = require("./Http/Validators/UserAuthValidator")

// models
const Role = require('./Models/Role');
const User = require('./Models/User');



const AppContainer = createContainer({
    injectionMode: InjectionMode.PROXY
})



AppContainer.loadModules([
    'app/Models/*.js',
    'app/Services/*.js',
    'app/Observers/*.js',
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

    AppModelsRole: asValue(Role),

    userModel: aliasTo("AppModelsUser"),

    usersService: aliasTo("AppServicesUsersService"),
    authService: aliasTo("AppServicesAuthService"),

    userController: aliasTo("AppHttpControllersUserController"),

    authController: aliasTo("AppHttpControllersAuthController"),

    bcrypt: asClass(Hashr),


    registerValidator: asFunction(registerValidator),
    loginValidator: asFunction(loginValidator),


})
// if you want to see all the registered modules in  App Container
// console.log(AppContainer.registrations)


module.exports = AppContainer


