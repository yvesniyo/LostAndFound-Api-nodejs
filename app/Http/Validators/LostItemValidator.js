const { buildCheckFunction } = require('express-validator');
const checkBodyAndQuery = buildCheckFunction(['body', 'query']);
const runValidations = require("./runValidations")

const lostItemCreateValidator = (opts) => {
    const resHelper = opts.resHelper
    const lostItemService = opts.lostItemService
    let validations = [
        checkBodyAndQuery("lost_type").isNumeric(),
        checkBodyAndQuery("holder_name").isString(),
        checkBodyAndQuery("card_no").isString(),
        checkBodyAndQuery("dob").isString(), //isDate({ format: "m/d/y" }),
        checkBodyAndQuery("gender").isIn(["M", "F"]).withMessage("Gender must be either M or F"),
        checkBodyAndQuery("description").isString(),
    ]
    return async (req, res, next) => runValidations(req, res, next, validations, resHelper)
}

const lostItemUpdateValidator = (opts) => {
    const resHelper = opts.resHelper
    let validations = [
        checkBodyAndQuery("lost_type").isNumeric(),
        checkBodyAndQuery("holder_name").isString(),
        checkBodyAndQuery("card_no").isString(),
        checkBodyAndQuery("dob").isString(), //.isDate(),
        checkBodyAndQuery("gender").isIn(["M", "F"]),
        checkBodyAndQuery("description").isString(),
    ]
    return async (req, res, next) => runValidations(req, res, next, validations, resHelper)
}


module.exports = {
    lostItemCreateValidator,
    lostItemUpdateValidator
}