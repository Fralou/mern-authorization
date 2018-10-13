const bcrypt = require('bcrypt');

const createHash = async function (password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return [null, hash]
    }
    catch (error) {
        return [error]
    }
}

module.exports.createHash = createHash;

const compare = async function (password, hash){
    try {
        const result = await bcrypt.compare(password, hash);
        return [null, result]
    }
    catch (error) {
        return [error]
    }
}
module.exports.compare = compare;