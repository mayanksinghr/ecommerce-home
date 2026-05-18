const addToCartModel = require("../../models/cartproduct")

const countAddToCardProduct =async(req,res)=>{
    try{
          const userId =req.userid

          const count = await addToCartModel.countDocuments({
            userId:userId
          })


          res.json({
            data:{
                count:count
            },
            message:"ok",
            error:false,
            success:true
          })


    }catch(error){
      res.json({
        message:error.message||error,
        error:false,
        success:false,
      })
    }
}

module.exports = countAddToCardProduct