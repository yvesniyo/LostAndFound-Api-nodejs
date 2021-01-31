const bcrypt = require('bcrypt');

class Hashr {
    constructor() {
        this.rounds = 10;
    }

    hashData({ data }) {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = await bcrypt.genSalt(this.rounds);
                const hashed = await bcrypt.hash(data, salt);
                resolve(hashed);
            } catch (error) {
                reject(error);
            }
        });
    }

    compareHashToPlain({ hash, plain }) {
        return new Promise(async (resolve, reject) => {
            try {
                const match = await bcrypt.compare(plain, hash);
                resolve(match);
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = Hashr;
