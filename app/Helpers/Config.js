
class Config {
    static get(key, defaultValue = null) {
        const data = process.env[key]
        if (!data) return defaultValue
        else return data
    }
}

module.exports = Config