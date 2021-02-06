class MyApp {

    constructor({ express, dotenv, allRoutesLib, cors, logger,
        cookieParser, eventServiceProvider, mainRouter, resHelper,
        paginate }) {

        this.dotenv = dotenv
        this.allRoutesLib = allRoutesLib
        this.cors = cors
        this.logger = logger
        this.cookieParser = cookieParser
        this.eventServiceProvider = eventServiceProvider
        this.mainRouter = mainRouter
        this.resHelper = resHelper
        this.paginate = paginate

        this.initEnvVariables()
        this.APP_DEBUG = eval(process.env.APP_DEBUG)
        this.APP_ENV = process.env.APP_ENV
        this.express = express
        this.expressApp = this.express()
        this.initMyApp()
    }

    initEnvVariables() {
        this.dotenv.config()
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
            console.log(this.allRoutesLib(this.expressApp));
    }

    registerMiddlewares() {
        this.expressApp.use(this.express.static(__dirname + '/public'));
        this.expressApp.use(this.cors);
        this.expressApp.use(this.logger(this.APP_ENV));
        this.expressApp.use(this.express.json());
        this.expressApp.use(this.express.urlencoded({ extended: false }));
        this.expressApp.use(this.cookieParser());
        this.expressApp.use(this.paginate.middleware(10, 50))
        this.expressApp.all(function (req, res, next) {
            if (req.query.limit <= 10) req.query.limit = 10;
            next();
        })
    }

    initializeServiceProviders() {
        this.eventServiceProvider.register()
    }

    attachMainRoute() {
        this.expressApp.use('/', this.mainRouter.fetch());
    }

    catchHttpErrors() {
        // Error 404
        this.expressApp.use((req, res, next) => {
            this.resHelper({ res, status: 404, error: "Page Not Found" })
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
            this.resHelper({ res, status: err.status || 500, error: err.error })
        });
    }

    getApp() {
        return this.expressApp
    }
}


module.exports = MyApp;