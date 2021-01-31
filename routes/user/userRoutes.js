const express = require("express")
const app = require("../../app/Helpers/app")
const router = express.Router()


router.get("/all", (req, res, next) => app("AppHttpControllersUserController").getAllUsers({ req, res, next }))
router.get("/:id", (req, res, next) => app("AppHttpControllersUserController").getSingleUser({ req, res, next }))


module.exports = router