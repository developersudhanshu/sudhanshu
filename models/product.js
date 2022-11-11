const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const moment = require("moment");
const productSchema = new mongoose.Schema({
  avatar: { type: String ,required:true},
  product_Name: { type: String, trim: true,   },
  vendor: { type: String, trim: true },
  mrp_Price: { type: Number, trim: true },
  price: { type: Number, trim: true },
  stock_Quantity: { type: Number, trim: true },
  category: { type: String, trim: true },
  sub_Category: { type: String, trim: true },
  brand_Name: { type: String, trim: true },
  manage_Stock: { type: String, trim: true },
  discription: { type: String, trim: true },
  keywords: { type: String, trim: true},
  varient_lable:{ type: String, trim: true},
  status: { type: String, trim: true}
});

const product = new mongoose.model("product", productSchema);

module.exports = product;
