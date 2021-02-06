const { buildCheckFunction } = require('express-validator');
const { resolve } = require('../../container');
const checkBodyAndQuery = buildCheckFunction(['body', 'query']);
const runValidations = require("./runValidations")

const userItemCreateValidator = ({ resHelper, userItemService, moment, locale }) => {
    let validations = [
        checkBodyAndQuery("lost_type_id").isNumeric().custom((lost_type_id) => {
            return new Promise((resolve, reject) => {
                const item = userItemService.find(lost_type_id)
                if (!item) return reject(locale.translate("lost_type_id not found"))
                return resolve(true)
            })
        }),
        checkBodyAndQuery("holder_name").isString().isLength({ min: 5 }),
        checkBodyAndQuery("card_no").isString().isLength({ min: 10 })
    ]
    return async (req, res, next) => runValidations(req, res, next, validations, resHelper)
}

const userItemUpdateValidator = ({ resHelper, userItemService, moment, locale }) => {
    let validations = [
        checkBodyAndQuery("lost_type_id").isNumeric().custom((lost_type_id) => {
            return new Promise((resolve, reject) => {
                const item = userItemService.find(lost_type_id)
                if (!item) return reject(locale.translate("lost_type_id not found"))
                return resolve(true)
            })
        }),
        checkBodyAndQuery("holder_name").isString().isLength({ min: 5 }),
        checkBodyAndQuery("card_no").isString().isLength({ min: 10 })
    ]
    return async (req, res, next) => runValidations(req, res, next, validations, resHelper)
}

module.exports = {
    userItemCreateValidator,
    userItemUpdateValidator
}