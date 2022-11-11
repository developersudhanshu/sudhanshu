const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
 tittle:{ type: String, trim: true},
  
});

const category = new mongoose.model('category', Schema);

module.exports = category;