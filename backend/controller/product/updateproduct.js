const productModel= require("../../models/productModel");

const UploadProductPromission = require("../../helpers/permission")

async function updateproductController(req,res){
 try{
    console.log("mayank")
      if(!UploadProductPromission(req.userid)){
        throw new Error("permission denied")
      }
          
      const {_id,...resBody} = req.body
      console.log("_id",_id);
      console.log("res.Body",resBody);
      const updateProduct = await productModel.findByIdAndUpdate(_id,resBody);
      
      
      res.json({
        data:updateProduct, 
        message:"product update",
        success:true,
        error:false  
      })


 }catch(err){ 
    res.status(400).json({
        message:err.message||err,
        error:true,
        success:false,
    })
 }
}


module.exports = updateproductController