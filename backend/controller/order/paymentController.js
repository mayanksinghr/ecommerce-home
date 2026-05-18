/*const stripe = require("../../config/stripe")
const userModel = require("../../models/userModel")


const paymentController = async(request,response)=>{
    try{
       const {cartItems} = request.body

     

       const user = await userModel.findOne({_id:request.userid})
      
       const params = {
              submit_type:"pay",
              mode:"payment",
              payment_method_types :['card'],
              billing_address_collection:"auto",
              shipping_options:[
                {
                    shipping_rate:"shr_1SGQ4SDS1vYOVRw1MmONnEe6"
                }
              ],
              customer_email: user.email,
              metadata:{
                userId:request.userid
              },
              line_items:cartItems.map((item,index)=>{
                return {
                    price_data:{
                        currency:"inr",
                        product_data:{
                           name:item.productId.productName,
                           images:item.productId.productImage,
                           metadata:{
                            productId:item.productId._id
                           },
                        },
                         
                        unit_amount:item.productId.sellingprice * 100
                    },
                    adjustable_quantity :{
                        enabled:true,
                        minimum : 1
                    },
                    quantity:item.quantity
                }
              }),
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/success`,
       }

       const session = await stripe.checkout.sessions.create(params)

       response.json(session)

    }catch(error){
       response.json({
            message:error?.message || error,
            error:true,
            success:false
        })
    }
}

module.exports = paymentController

/*const stripe = require("../../config/stripe");
const userModel = require("../../models/userModel");

const paymentController = async (request, response) => {
  try {
    const { cartItems } = request.body;

    console.log("cartItems", cartItems);

    const user = await userModel.findOne({ _id: request.userid });

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1SGQ4SDS1vYOVRw1MmONnEe6",
        },
      ],
      customer_email: user.email,
      metadata: {
        userId: request.userid,
      },
      line_items: cartItems.map((item) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productId.productName,
              images: item.productId.productImage,
            },
            //  Bug 1 fixed — metadata at correct level (price_data, not product_data)
            unit_amount: item.productId.sellingprice * 100,
            metadata: {
              productId: item.productId._id,
            },
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`, // ✅ Bug 2 fixed
    };

    const session = await stripe.checkout.sessions.create(params);
    response.json(session);

  } catch (error) {
    response.json({
      message: error?.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;*/


const stripe = require("../../config/stripe");
const userModel = require("../../models/userModel");

const paymentController = async (request, response) => {
  try {
    const { cartItems } = request.body;

    const user = await userModel.findOne({ _id: request.userid });

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        { shipping_rate: "shr_1SGQ4SDS1vYOVRw1MmONnEe6" },
      ],
      customer_email: user.email,

      metadata: {
        userId: request.userid,
        productIds: JSON.stringify(
          cartItems.map((item) => String(item.productId._id))
        ),
      },

      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.productId.productName,
            images: item.productId.productImage,
            // No metadata here — price_data doesn't support it
          },
          unit_amount: item.productId.sellingprice * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      })),

      success_url: `https://ecommerce-home-frontend.onrender.com/success`,
      cancel_url: `https://ecommerce-home-frontend.onrender.com/cancel`,
    };

    const session = await stripe.checkout.sessions.create(params);
    response.json(session);

  } catch (error) {
    response.json({
      message: error?.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;