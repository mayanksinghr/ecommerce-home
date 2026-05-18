import ProductDetails from "../pages/productDetails";


const backendDomain = "https://ecommerce-home.onrender.com"

const SummaryApi = {
  signup:{
    url:`${backendDomain}/api/signup`,
    method:"post"
  },
  signin:{
    url:`${backendDomain}/api/signin`,
    method:"post"
  },
  current_user:{
    url:`${backendDomain}/api/user-details`,
    method:"get"
  },
  logout_user:{
    url : `${backendDomain}/api/userLogout`,
    method:"get"
  },
  alluser:{
    url:`${backendDomain}/api/all-user`,
    method:"get"
  },
  updateUser:{
    url:`${backendDomain}/api/update-user`,
    method:"post"
  },
  uploadProduct:{
    url:`${backendDomain}/api/upload-product`,
    method:'post'
  },
  allProduct:{
    url:`${backendDomain}/api/get-product`,
    method:"get"
  },
  updateProduct:{
    url:`${backendDomain}/api/update-product`,
    method:"post"
  },
  categoryProduct:{
     url:`${backendDomain}/api/get-categoryproduct`,
     method:"get"
  },
  getCategoryWiseProduct:{
    url:`${backendDomain}/api/category-product`,
    method:"post",
  },
  ProductDetails:{
  url:`${backendDomain}/api/product-details`,
  method:`post`
  },
  addToCartProduct:{
    url:`${backendDomain}/api/addtocart`,
    method:"post"
  },
  addToCartProductCount:{
    url:`${backendDomain}/api/countAddToCardProduct`,
    method:"get"
  },
  addToCartProductView:{
    url:`${backendDomain}/api/view-card-product`,
    method:"get"
  },
  updateCardProduct:{
    url: `${backendDomain}/api/update-cart-product`,
    method:"post"
  },
  deleteCardProduct:{
    url:`${backendDomain}/api/delete-card-product`,
    method:"post"
  },
  searchProduct:{
    url:`${backendDomain}/api/search`,
    method:"get",
  },
  filterProduct:{
    url:`${backendDomain}/api/filter-product`,
    method:"post"
  },
  payment:{
    url:`${backendDomain}/api/checkout`,
    method:"post"
  },
  getOrder:{
    url:`${backendDomain}/api/all-order`,
    method:"get"
  }
}

export default SummaryApi;
