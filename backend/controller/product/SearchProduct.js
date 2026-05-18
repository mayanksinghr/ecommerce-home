const productModel = require("../../models/productModel")

const SearchProduct = async(req,res)=>{
    try{
       const query = req.query.q

       const regex =new RegExp(query,"i","g");

       const product = await productModel.find({
        "$or":[
            {
                category:regex
            },
            {
                productName:regex,
            },
        ]
       })
 

      res.json({
        data:product,
        message:"Search product list",
        error:false,
        success:true,
      })
       


    }catch(err){
      res.json({
        message:err.message||err,
        error:true,
        success:false,
      })
    }
}

module.exports = SearchProduct