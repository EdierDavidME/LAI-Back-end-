const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require('crypto');
mongoose.set('useFindAndModify', false);

let wordSchema = new Schema({
  id: { type: String },
  idUser: { type: String, required: true },
  word: { type: String, required: true },
  mean: { type: String, required: true },
  espanol: { type: String, required: true },
  significado: { type: String, required: true },
  link_get: { type: String, default: "https://dictionary.cambridge.org/" },
  image_get: { type: String },
  createDate: {type: Date, default: Date.now()}
}, {versionKey: false});

wordSchema.methods.gravatar = ()=>{
    if(!this.image_get) return 'http://0.gravatar.com/avatar/c7dba64c1f931b5307d8cfcb5dfd37ba'

    const md5 = crypto.creatHash('md5').update(this.image_get).digest('hex');
    return `${md5}`;
}

let Word = mongoose.model('Word', wordSchema);
module.exports = Word;