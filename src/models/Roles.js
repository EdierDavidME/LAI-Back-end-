const { Schema, model } = require('mongoose');
// const ROLES = ["user", "moderator", "admin"];

const rolSchema = new Schema({
    name: String
},{
    versionKey: false
});

module.exports = model("Rol", rolSchema);