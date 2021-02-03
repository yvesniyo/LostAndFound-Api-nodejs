const AuthenticateNormalUser = ({ jwt, resHelper, authenticateToken }) => {
    return (req, res, next) => authenticateToken(req, res, () => {
        if (req.user.role_id != 3) {
            return resHelper({ res, error: "Unauthorized Request", status: 403 })
        }
        return res.send("hlll")
        next()
    })
}


module.exports = AuthenticateNormalUser