const express = require("express")
const router = express.Router()
const app = require("../../app/Helpers/app")


router.get(
    "/login",
    app("loginValidator"),
    (req, res, next) => app("AppHttpControllersAuthController").login({ req, res, next }))


router.get(
    "/register",
    app("registerValidator"),
    (req, res, next) => app("AppHttpControllersAuthController").register({ req, res, next }))


module.exports = router