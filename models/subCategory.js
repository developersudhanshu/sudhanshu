const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    category_id:{type:mongoose.Types.ObjectId},
 
 subCategory:{ type: String, trim: true}
});

const subCategory = new mongoose.model('subCategory', Schema);

module.exports = subCategory;