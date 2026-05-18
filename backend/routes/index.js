const express = require('express')
const router = express.Router()


const userSignUpController = require("../controller/user/usersignup");
const userSignInController = require('../controller/user/usersignin');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout.js');
const allusers = require('../controller/user/allUsers.js')
const updateUser = require('../controller/user/updateUser.js');
const UploadProductController = require('../controller/product/uploadProduct.js');
const getProductController = require('../controller/product/getProduct.js');
const updateproductController = require('../controller/product/updateproduct.js');
const getCategeoryProduct = require('../controller/product/getCategoryProductOne.js');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct.js');
const getProductDetails = require('../controller/product/getProductDetails.js');
const addToCartController = require('../controller/user/addToCartController.js');
const countAddToCardProduct = require('../controller/user/countAddToCartProduct.js');
const AddToCartViewProduct = require('../controller/user/addToCardViewProduct.js');
const updateAddToCardProduct = require('../controller/user/updateAddToCardProduct.js');
const deleteAddToProduct = require('../controller/user/deleteAddToCartProduct.js');
const searchProduct = require('../controller/product/SearchProduct.js');
const filterProductController = require('../controller/product/filerProduct.js');
const paymentController = require('../controller/order/paymentController.js');

const orderController = require('../controller/order/orderController.js');
const allOrderController = require('../controller/order/allOrderController.js');



router.post("/signup",userSignUpController);
router.post("/signin",userSignInController);
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)


//admin panel
router.get("/all-user",authToken,allusers);
router.post("/update-user",authToken,updateUser);

//product
router.post("/upload-product",authToken,UploadProductController);
router.get("/get-product",getProductController);
router.post("/update-product",authToken,updateproductController)
router.get("/get-categoryproduct",getCategeoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails);
router.get("/search",searchProduct);
router.post("/filter-product",filterProductController)


//user add to cart
router.post("/addtocart",authToken,addToCartController);
router.get("/countAddToCardProduct",authToken,countAddToCardProduct);
router.get("/view-card-product",authToken,AddToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCardProduct);
router.post("/delete-card-product",authToken,deleteAddToProduct)

//payment and order
router.post("/checkout",authToken,paymentController)


//get order details
router.get("/order-list",authToken,orderController)
router.get("/all-order",authToken,allOrderController)


module.exports = router