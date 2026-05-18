const addToCartModel = require("../../models/cartproduct")

 const deleteAddToProduct = async(req,res)=>{
   try{
      const currentUserId = req.userid
      const addToCardProductId = req.body._id

      console.log("addToCardProductId",addToCardProductId)

      const deleteProduct = await addToCartModel.deleteOne({_id:addToCardProductId})

      res.json({
        message:"product Deleted From Cart",
        error:false,
        success:true,
        data:deleteProduct
      })


   }catch(err){
    res.json({
    message:err?.message||err,
    error:true,
    success:false,
    })
   }
}

module.exports = deleteAddToProduct;