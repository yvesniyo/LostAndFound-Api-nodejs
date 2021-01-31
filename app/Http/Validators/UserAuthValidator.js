const { validationResult, buildCheckFunction } = require('express-validator');
const resHelper = require('../../Helpers/ResHelper');
const UsersService = require('../../Services/UsersService');
const checkBodyAndQuery = buildCheckFunction(['body', 'query']);

// sequential processing, stops running validations chain if the previous one have failed.
const registerValidator = (opts) => {

    let user = opts.usersService

    let validations = [
        checkBodyAndQuery("email").isEmail().custom((email) => {
            return new Promise(async (resolve, reject) => {
                let userEmail
                try {
                    userEmail = await user.getUserByUsername({ email });
                } catch (error) {
                    return resolve(true)
                }
                return reject("Email is in use")
            })

        }),
        checkBodyAndQuery("name").isString().withMessage("Name is required"),
        checkBodyAndQuery("name").isLength({ min: 5, max: 20 }),
        checkBodyAndQuery("username").isString().withMessage("Username is required"),
        checkBodyAndQuery("password").isString(),
        checkBodyAndQuery("phone").isString().isMobilePhone(),
        checkBodyAndQuery("confirm_password").isString().custom((value, { req }) => {
            if (value !== req.query.password) {
                return Promise.reject('Password confirmation does not match password');
            }
            return true;
        })
    ]
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        resHelper({ status: 400, error: errors, res });

    };
};


// sequential processing, stops running validations chain if the previous one have failed.
const loginValidator = (opts) => {
    let validations = [
        checkBodyAndQuery("email").isString(),
        checkBodyAndQuery("password").isString(),
    ]


    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        resHelper({ status: 400, error: errors, res });
    };
};





module.exports = { registerValidator, loginValidator }