/** generate token with user datas expires after (24 hours) by default */
const generateAccessToken = (opts) => {

    const jwt = opts.jwt
    return (userDatas, expiresIn = 86400) => {
        console.log("ExpiresIn ", expiresIn)
        return jwt.sign(userDatas, process.env.ACCESS_TOKEN_SECRET, { expiresIn });
    }
}

module.exports = generateAccessToken