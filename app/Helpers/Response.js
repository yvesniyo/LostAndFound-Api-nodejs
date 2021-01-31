
class Response {

    status = null
    message = null
    data = null
    error = null

    constructor() {
        this.status = 200
        this.message = "ok"
        this.data = null
        this.error = null
    }

    status(status) {
        this.status = status
        return this
    }

    message(message) {
        this.message = message
        return this
    }

    data(data) {
        this.data = data
        return this
    }

    toArray() {
        console.log(this.status)
        return {
            status: this.status,
            message: this.message,
            data: this.data,
            error: this.error,
        }
    }

    toJson() {
        return JSON.stringify(this.toArray())
    }

}



module.exports = Response