const productModel = require("../../models/productModel");

const getCategeoryProduct =async(req,res)=>{
    try{ 
        const productCategary = await productModel.distinct("category")
        console.log("category",productCategary);
       //array to store one product from each category
        const productByCategary = []
        for(const category of productCategary){

          const product = await productModel.findOne({category}) 

          
          if(product){
            productByCategary.push(product);
          }
          }

          res.json({
            message:"category product",
            data:productByCategary,
            success:true,
            error:false
          })


       }
    catch(err){
      res.status(400).json({
        message:err.message||err,
        error:true,
        success:false
      })
    }
}

module.exports = getCategeoryProduct;