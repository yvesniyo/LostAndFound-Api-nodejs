
const resHelper = ({ status = 200, message = "ok", res, data = null, error = null }) => {
    let rslt;
    if (status == 200) {
        rslt = {
            status,
            message,
            data
        }
    } else {
        if (data == null) {
            rslt = {
                status,
                error
            }
        } else {
            rslt = {
                status,
                error,
                data
            }
        }
    }

    if (res != null)
        return res.status(status).json(rslt)
    return rslt

}


module.exports = resHelper