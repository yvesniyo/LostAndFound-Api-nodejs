const { buildCheckFunction } = require('express-validator');
const checkBodyAndQuery = buildCheckFunction(['body', 'query']);
const runValidations = require("./runValidations")

const lostItemCreateValidator = ({ resHelper, lostItemService, moment, locale }) => {
    let validations = [
        checkBodyAndQuery("lost_type").isNumeric(),
        checkBodyAndQuery("holder_name").isString(),
        checkBodyAndQuery("card_no").isString(),
        checkBodyAndQuery("dob").isString().custom((dob) => {
            return new Promise((resolve, reject) => {
                const valid = moment(dob, "YYYY-MM-DD", true).isValid()
                if (valid) return resolve(true)
                return reject("The date must be of this format YYYY-MM-DD")
            })
        }),
        checkBodyAndQuery("gender").isIn(["M", "F"]).withMessage(locale.translate("Gender must be either M or F")),
        checkBodyAndQuery("description").isString(),
    ]
    return async (req, res, next) => runValidations(req, res, next, validations, resHelper)
}

const lostItemUpdateValidator = ({ resHelper, locale }) => {
    let validations = [
        checkBodyAndQuery("lost_type").isNumeric(),
        checkBodyAndQuery("holder_name").isString(),
        checkBodyAndQuery("card_no").isString(),
        checkBodyAndQuery("dob").isString().custom((dob) => {
            return new Promise((resolve, reject) => {
                const valid = moment(dob, "YYYY-MM-DD", true).isValid()
                if (valid) return resolve(true)
                return reject(locale.translate("The date must be of this format YYYY-MM-DD like (1998-05-05)"))
            })
        }),
        checkBodyAndQuery("gender").isIn(["M", "F"]),
        checkBodyAndQuery("description").isString(),
    ]
    return async (req, res, next) => runValidations(req, res, next, validations, resHelper)
}


module.exports = {
    lostItemCreateValidator,
    lostItemUpdateValidator
}