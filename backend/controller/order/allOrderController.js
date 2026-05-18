const orderModel = require("../../models/orderProductModel")
const userModel = require("../../models/userModel")

const allOrderController = async(req,response)=>{
    const userId = req.userid
    console.log("order page-user id",userId)
    const user = await userModel.findById(userId)

    if(user.role !== 'ADMIN'){
        return response.status(500).json({
            message : "not access"
        })
    }

    const AllOrder = await orderModel.find().sort({ createdAt : -1 })

    return response.status(200).json({
        data : AllOrder,
        success : true
    })

}

module.exports = allOrderController