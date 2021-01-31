const express = require('express');
const router = express.Router();
const authRouter = require("./user/authRoutes")
const userRouter = require("./user/userRoutes")



router.get("/", (req, res, next) => {
    res.send("Welcome to our api!")
})


router.use("/auth/user", authRouter)
router.use("/user", userRouter)


module.exports = router