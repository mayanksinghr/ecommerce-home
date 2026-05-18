const productModel = require("../../models/productModel");
const UploadProductPermission = require("../../helpers/permission");


async function UploadProductController(req,res){

    console.log("req.body",req.body);
    try{
    const sessionUserId = req.userid
    if(!UploadProductPermission(sessionUserId)){
        throw new Error ("Permission denied");
    }

    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save()

    res.status(201).json({
        message:"product upload successfully",
        error:false,
        success:true,
        data:saveProduct
    })

    }catch(err){
        res.status(400).json({
        message:err.message||err,
        error:true,
        success:false
        })
    }
}

module.exports = UploadProductController;