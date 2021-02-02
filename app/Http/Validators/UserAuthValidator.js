const { validationResult, buildCheckFunction } = require('express-validator');
const checkBodyAndQuery = buildCheckFunction(['body', 'query']);

const runValidations = async (req, res, next, validations, resHelper) => {
    for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    resHelper({ status: 400, error: errors, res });
}

const registerValidator = ({ resHelper, usersService }) => {

    let validations = [
        checkBodyAndQuery("email").isEmail().custom((email) => {
            return new Promise(async (resolve, reject) => {
                let userEmail = await usersService.getUserByUsername({ email })
                if (!userEmail) {
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
    return async (req, res, next) => runValidations(req, res, next, validations, resHelper)

};


const loginValidator = (opts) => {
    const resHelper = opts.resHelper
    let validations = [
        checkBodyAndQuery("email").isString(),
        checkBodyAndQuery("password").isString(),
    ]
    return async (req, res, next) => runValidations(req, res, next, validations, resHelper)
};





module.exports = { registerValidator, loginValidator }