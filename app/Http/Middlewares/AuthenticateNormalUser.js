const AuthenticateNormalUser = ({ jwt, resHelper, authenticateToken, locale }) => {
    return (req, res, next) => authenticateToken(req, res, () => {
        if (req.user.role_id != 3) {
            return resHelper({ res, error: locale.translate("Unauthorized Request"), status: 403 })
        }
        next()
    })
}


module.exports = AuthenticateNormalUser