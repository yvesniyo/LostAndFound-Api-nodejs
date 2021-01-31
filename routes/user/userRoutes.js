const express = require("express")
const app = require("../../app/Helpers/app")
const authenticateToken = require("../../app/Http/Middlewares/AuthenticateToken")
const router = express.Router()


router.get("/all", authenticateToken, (req, res, next) => app("AppHttpControllersUserController").getAllUsers({ req, res, next }))
router.get("/:id", authenticateToken, (req, res, next) => app("AppHttpControllersUserController").getSingleUser({ req, res, next }))


module.exports = router