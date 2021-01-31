const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const baseRouter = require("./routes/index");
const EventServiceProvider = require('./app/ServiceProvider/EventServiceProvider');
const resHelper = require('./app/Helpers/ResHelper');
const all_routes = require('express-list-endpoints');

require('dotenv').config();


const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// attach base route
app.use('/', baseRouter);

// show all routes when is in debug
if (eval(process.env.APP_DEBUG)) console.log(all_routes(app));

// Init service providers
new EventServiceProvider().register()


// Error 404
app.use((req, res, next) => {
    resHelper({ res, status: 404, error: "Page Not Found" })
});


// Unknown error
app.use((err, req, res, next) => {
    // Debug handler in console
    if (eval(process.env.APP_DEBUG)) {
        console.log(err)
        process.stderr.on('error', (error) => {
            console.log(error)
        })
    }
    resHelper({ res, status: err.status || 500, error: err.error })
});

module.exports = app;