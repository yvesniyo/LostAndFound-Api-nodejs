const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const baseRouter = require("./routes/index");
const EventServiceProvider = require('./app/ServiceProvider/EventServiceProvider');
const AppContainer = require('./app/AppContainer');
const Mailer = require('./app/Helpers/Mailer');
const EventDispatcher = require('./app/Helpers/EventDispatcher');
const UsersService = require('./app/Services/UsersService');
const UserCreatedEvent = require('./app/Events/UserCreatedEvent');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// attach base route
app.use('/', baseRouter);

// database debug handler
if (process.env.APP_DEBUG) {
    process.stderr.on('error', (error) => {
        console.log(error)
    })
}

// init service providers
new EventServiceProvider().register()

// const test = async () => {
//     EventDispatcher.dispatch(
//         new UserCreatedEvent(await AppContainer.resolve("usersService").find(1))
//     )
// }
// test()

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next({
        error: 'Not found',
        status: 404,
    });
});

// error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({
        ok: false,
        error: err.error,
        data: err.data,
        debug: err,
    });
});

module.exports = app;