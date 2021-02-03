const AppContainer = require('./app/Helpers/app');
const Config = require('./app/Helpers/Config');
const resHelper = require('./app/Helpers/ResHelper');

class MyApp {

    constructor() {
        this.initEnvVariables()
        this.APP_DEBUG = eval(process.env.APP_DEBUG)
        this.express = AppContainer("express")
        this.expressApp = this.express()
        this.initMyApp()
    }

    initEnvVariables() {
        AppContainer("dotenv").config()
    }

    initMyApp() {
        this.registerMiddlewares()
        this.attachMainRoute()
        this.initializeServiceProviders()
        this.catchHttpErrors()
        this.attachConsoleDebug()
    }

    attachConsoleDebug() {
        if (this.APP_DEBUG == false)
            console.log(AppContainer("allRoutesLib")(this.expressApp));
    }

    registerMiddlewares() {
        this.expressApp.use(AppContainer("cors"));
        this.expressApp.use(AppContainer("logger")(process.env.APP_ENV));
        this.expressApp.use(this.express.json());
        this.expressApp.use(this.express.urlencoded({ extended: false }));
        this.expressApp.use(AppContainer("cookieParser")());
    }

    initializeServiceProviders() {
        AppContainer("eventServiceProvider").register()
    }

    attachMainRoute() {
        this.expressApp.use('/', AppContainer("mainRouter").fetch());
    }

    catchHttpErrors() {
        // Error 404
        this.expressApp.use((req, res, next) => {
            resHelper({ res, status: 404, error: "Page Not Found" })
        });
        // Unknown error
        this.expressApp.use((err, req, res, next) => {
            // Debug handler in console
            if (this.APP_DEBUG) {
                console.log(err)
                process.stderr.on('error', (error) => {
                    console.log(error)
                })
            }
            resHelper({ res, status: err.status || 500, error: err.error })
        });
    }

    getApp() {
        return this.expressApp
    }
}

const app = new MyApp()


module.exports = app.getApp();