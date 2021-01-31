const jwt = require("jsonwebtoken");

/** generate token with user datas expires after (1800 seconds = 30 minutes) by default */
function generateAccessToken(userDatas, expiresIn = 1800) {
    return jwt.sign(userDatas, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
}


module.exports = generateAccessToken