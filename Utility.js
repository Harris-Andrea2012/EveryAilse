const crypto = require('crypto')

function validPassword(password, salt, hash) {
    var verify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === verify
}

function createPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex')
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

    return {
        salt: salt,
        hash: genHash
    }
}

module.exports.validPassword = validPassword
module.exports.createPassword = createPassword