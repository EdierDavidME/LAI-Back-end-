const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
// idUser: { type: String, required: true },

let wordSchema = new Schema(
  {
    id: { type: String },
    word: [{ type: String, required: true }],
    mean: [{ type: String, required: true }],
    espanol: [{ type: String, required: true }],
    significado: [{ type: String, required: true }],
    link_get: {
      type: String,
      default: "https://dictionary.cambridge.org/",
    },
    image_get: { type: String },
    createDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

wordSchema.pre("save", function (next) {
  try {
    this.word = capitalizeArrays(this.word);
    this.mean = capitalizeArrays(this.mean);
    this.espanol = capitalizeArrays(this.espanol);
    this.significado = capitalizeArrays(this.significado);
    next();
  } catch (error) {
    console.log("Save word: something went wrong!");
  }
});

// Capitalize normal word
const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.toLowerCase().slice(1);
};

// Capitalize arrays
const capitalizeArrays = (array_Word) => {
  const values = [];
  array_Word.forEach(function (word) {
    values.push(capitalize(word));
  });
  return values;
};

wordSchema.methods.gravatar = () => {
  if (!this.image_get)
    return "http://0.gravatar.com/avatar/c7dba64c1f931b5307d8cfcb5dfd37ba";

  const md5 = crypto.creatHash("md5").update(this.image_get).digest("hex");
  // console.log("md5: ",md5);
  return md5;
};

let Word = mongoose.model("Word", wordSchema);
module.exports = Word;

// boostboy
// multer
