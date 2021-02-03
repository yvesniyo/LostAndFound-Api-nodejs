const { buildCheckFunction } = require('express-validator');
const checkBodyAndQuery = buildCheckFunction(['body', 'query']);
const runValidations = require("./runValidations")

const lostTypeCreateValidator = (opts) => {
    const resHelper = opts.resHelper
    const lostTypeService = opts.lostTypeService
    let validations = [
        checkBodyAndQuery("name").isString(),
        checkBodyAndQuery("name").custom((name) => {
            return new Promise(async (resolve, reject) => {
                const lostType = await lostTypeService.getLostTypeByName({ name })
                if (!lostType) return resolve(true)
                reject("This name already exists")
            })
        }),
        checkBodyAndQuery("description").isString(),
    ]
    return async (req, res, next) => runValidations(req, res, next, validations, resHelper)
}

const lostTypeUpdateValidator = (opts) => {
    const resHelper = opts.resHelper
    let validations = [
        checkBodyAndQuery("name").isString(),
        checkBodyAndQuery("description").isString(),
    ]
    return async (req, res, next) => runValidations(req, res, next, validations, resHelper)
}


module.exports = {
    lostTypeCreateValidator,
    lostTypeUpdateValidator
}