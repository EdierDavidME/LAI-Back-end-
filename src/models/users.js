const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const saltRounds = 15;
mongoose.set('useFindAndModify', false);


let userSchema = new Schema({
  id: { type: String },
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true, index: { unique: true } },
  avatar: {type: String},
  password: { type: String, required: true },
  singUp: {type: Date, default: Date.now()},
  lastLogin: Date
}, {versionKey: false});

userSchema.pre('save', function(next) {
    bcrypt.genSalt(saltRounds).then(salts =>{
        bcrypt.hash(this.password, salts).then(hash =>{
            // Store hash in your password DB
            this.password = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
});

userSchema.methods.gravatar = ()=>{
    if(!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

    const md5 = crypto.creatHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
}

let User = mongoose.model('Users', userSchema);
module.exports = User;