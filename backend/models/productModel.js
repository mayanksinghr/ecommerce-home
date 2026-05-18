const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productName :String,
    brandName:String,
    category:String,
    productImage:[],
    description:String,
    price:Number,
    sellingprice:Number
},{
    timestamps:true
})

const productModel = mongoose.model("product",productSchema)

module.exports = productModel

