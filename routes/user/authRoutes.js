const express = require("express")
const router = express.Router()
const app = require("../../app/Helpers/app")
const authenticateToken = require("../../app/Http/Middlewares/AuthenticateToken")


router.get(
    "/login",
    app("loginValidator"),
    (req, res, next) => app("AppHttpControllersAuthController").login({ req, res, next }))


router.post(
    "/register",
    app("registerValidator"),
    (req, res, next) => app("AppHttpControllersAuthController").register({ req, res, next }))


router.get(
    "/me",
    authenticateToken,
    (req, res, next) => app("AppHttpControllersAuthController").me({ req, res, next }))


module.exports = router