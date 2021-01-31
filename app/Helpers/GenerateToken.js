const jwt = require("jsonwebtoken");

/** generate token with user datas expires after (24 hours) by default */
function generateAccessToken(userDatas, expiresIn = (86400)) {
    return jwt.sign(userDatas, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
}


module.exports = generateAccessToken