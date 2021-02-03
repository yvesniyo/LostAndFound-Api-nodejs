const AuthenticateAdmin = ({ jwt, resHelper, authenticateToken, locale }) => {
    return (req, res, next) => authenticateToken(req, res, () => {
        if (req.user.role_id != 1 || req.user.role_id == 2) {
            return resHelper({ res, error: locale.translate("Unauthorized Request"), status: 403 })
        }
        req.isAdminUser = true;
        next()
    })

}



module.exports = AuthenticateAdmin