const AuthenticateToken = ({ jwt, resHelper, locale }) => {

    return (req, res, next) => {
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization'] || req.query._token
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return resHelper({ res, error: locale.translate("Provide Access Token in 'Authorization' Header or '_token' UrlQuery "), status: 403 }) // if there isn't any token

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err instanceof jwt.TokenExpiredError) return resHelper({ res, error: locale.translate("Jwt Token Expired"), status: 403 })
            if (err) return resHelper({ res, error: locale.translate("Unauthorized Request"), status: 403 })
            req.user = user
            next() // pass the execution off to whatever request the client intended
        })
    }
}




module.exports = AuthenticateToken