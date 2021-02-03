
const { validationResult } = require('express-validator');

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

module.exports = runValidations