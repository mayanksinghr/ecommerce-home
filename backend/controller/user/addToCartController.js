const addToCartModel = require("../../models/cartproduct");

const addToCartController = async(req,res)=>{
    try{
       const {productId} = req?.body;
       const currentUser= req.userid;

     const isProductAvailable = await addToCartModel.findOne({productId,userId:currentUser});

     if(isProductAvailable){
        return res.json({
            message:"Already exits in Add to card",
            success: false,
            error:true
        })
     }

     const payload ={
        productId:productId,
        quantity:1,
        userId:currentUser,
       }



     const newAddToCart = new addToCartModel(payload)
     const saveProduct = await newAddToCart.save()

     res.json({
        data:saveProduct,
        message:"product Added in cart",
        success:true,
        error:false
     })

    }catch{
        res.json({
          message:err?.message||err,
          error:true,
          success:false
        })
    }
}

module.exports =addToCartController