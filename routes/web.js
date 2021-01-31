const express = require('express');
const router = express.Router();


router.get("/", (req, res, next) => {
    res.send("Welcome to our testing node app")
})


module.exports = router