/*const stripe = require("../../config/stripe");
const orderModel = require("../../models/orderProductModel");



 const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY
 console.log("endpointSecret",endpointSecret)

 //get line items details from stripe
async function getLIneItems(lineItems){
    let ProductItems =[]
    

    if(lineItems?.data?.length){
    for(const item of lineItems.data){
        const product = await stripe.products.retrieve(item.price.product);
        const productId = product.metadata.productId
         console.log("productId",productId);

        const productData = {
            productId :productId,
            name:product.name,
            price:item.price.unit_amount/100,
            quantity:item.quantity
        }

        ProductItems.push(productData)

    }
    }

    return ProductItems
}





//webhook controller
const webhooks = async(request,response)=>{
 console.log("Webhook called")

   const sig = request.headers["stripe-signature"]; 

   const payloadString = JSON.stringify(request.body)

   const header = stripe.webhooks.generateTestHeaderString({
    payload:payloadString,
    secret:endpointSecret
   })

 let event;

 try{
    event = stripe.webhooks.constructEvent(payloadString,header,endpointSecret);
 }catch(err){
    response.send(`Webhook Error: ${err.message}`);
    return;
 }


 //handle the event
 switch(event.type){
    case 'checkout.session.completed':
    const session = event.data.object;
    
  
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
     
    const productDetails = await getLIneItems(lineItems);

    const orderDeatails = {
           productDeatails : productDetails,
           email:session.customer_email,
           userId:session.metadata.userId,
           paymentDetails:{
            paymentId:session.payment_intent,
            payment_method_type:session.payment_method_types,
            payment_status:session.payment_status,             
           },
           shipping_option:session.shipping_option,
           totalAmount:session.amount_total/100
        }
        

        const order = await orderModel(orderDeatails)
        console.log("ordersave",order)

        const saveOrder  = await order.save()
         


  
       console.log("lineItems",lineItems)
       console.log("totalAmount",session.amount_total/100)
    //then define and call a function to handle the event payment_intent.succeeded
    break;
    //..handle other event types
    default:
        console.log(`Unhandled event type ${event.type}`); 
 }
  response.send()
}

module.exports = webhooks
//gdchjxkZ

/*const stripe = require("../../config/stripe");
const orderModel = require("../../models/orderProductModel");

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

async function getLineItems(lineItems) {
  let productItems = [];

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;
      console.log("productId", productId);

      const productData = {
        productId: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity, //  Bug 2 fixed
      };

      productItems.push(productData);
    }
  }

  return productItems;
}

const webhooks = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  //  Bug 1 fixed — use raw request.body + real stripe signature
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        { expand: ["data.price.product"] }
      );

      const productDetails = await getLineItems(lineItems);

      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,       // ✅ Bug 3 fixed
          payment_method_type: session.payment_method_types,
          payment_status: session.payment_status,  // ✅ Bug 3 fixed
        },
        shipping_options: session.shipping_options,
        totalAmount: session.amount_total / 100,
      };

      //  Bug 5 fixed — added `new`
      const order = new orderModel(orderDetails);

      //  Bug 4 fixed — was `order.saave()`
      const saveOrder = await order.save();

      console.log(" Order saved:", saveOrder._id);
      console.log("totalAmount", session.amount_total / 100);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).send();
};

module.exports = webhooks;*/

const stripe = require("../../config/stripe");
const orderModel = require("../../models/orderProductModel");

const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

// productIds are passed in from session.metadata — no need to retrieve
// them from line item price metadata (that field doesn't exist on price_data)
async function getLineItems(lineItems, productIds) {
  const productItems = [];

  if (lineItems?.data?.length) {
    lineItems.data.forEach((item, index) => {
      productItems.push({
        productId: productIds[index], // matched by position
        name: item.description,       // Stripe sets this from product_data.name
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
      });
    });
  }

  return productItems;
}

const webhooks = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

      
  console.log(" session id:", session.id);
  console.log(" metadata:", session.metadata); 


        // Parse the productIds we stored in session metadata
        const productIds = JSON.parse(session.metadata.productIds || "[]");

        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id
        );

        const productDetails = await getLineItems(lineItems, productIds);

        const orderDetails = {
          productDetails,
          email: session.customer_email,
          userId: session.metadata.userId,
          paymentDetails: {
            paymentId: session.payment_intent,
            payment_method_type: session.payment_method_types,
            payment_status: session.payment_status,
          },
          shipping_option: session.shipping_option,
          totalAmount: session.amount_total / 100,
        };

        const order = new orderModel(orderDetails);
        const savedOrder = await order.save();
        console.log("Order saved:", savedOrder._id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return response.status(500).send("Internal webhook error");
  }

  response.json({ received: true });
};

module.exports = webhooks;