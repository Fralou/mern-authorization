const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {type: String}
});
module.exports = mongoose.model('User', UserSchema);