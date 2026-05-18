const productModel = require("../../models/productModel")

const filterProductController = async(req,res)=>{
    try{
     const categoryList = req?.body?.category || []
     console.log(categoryList);
      
     const product = await productModel.find({
       category:{
        "$in":categoryList
       }
     })

     console.log("data",product);

     res.json({
        data:product,
        message:"product",
        error:false,
        success:true
     })

    }catch(err){
        res.json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports = filterProductController 