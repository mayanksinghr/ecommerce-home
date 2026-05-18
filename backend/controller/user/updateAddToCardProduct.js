const addToCartModel = require("../../models/cartproduct");

const updateAddToCardProduct = async(req,res)=>{
    try{
      const currentUserId = req.userid
      const addToCartProductId = req.body._id

    

      const qty = req.body.quantity
      console.log("qty",qty);


      const updateProduct =await addToCartModel.updateOne({_id:addToCartProductId},{
         ...(qty && {quantity:qty})
      })

      res.json({
        message:"product Updated",
        data:updateProduct,
        error:false,
        success:true
      })


    }catch(err){
     res.json({
        message:err?.message||err,
        error:true,
        success:false
     })
    }
}

module.exports = updateAddToCardProduct