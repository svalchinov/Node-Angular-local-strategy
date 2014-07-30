var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model("Users", new Schema({
    username: String,
    password: String,
    created: {type: Date, 'default':Date.now}
}, {
    collection: "users"
}));