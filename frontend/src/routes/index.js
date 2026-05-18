import {createBrowserRouter} from "react-router-dom"
import App from "../App";
import Home from "../pages/home"; 
import Login from "../pages/Login";
import Forgotpassword from "../pages/forgotpassword";
import Signup from "../pages/signUp";
import AdminPanel from "../pages/Adminpanel";
import Alluser from "../pages/AllUser";
import Allproduct from "../pages/Allproduct";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/productDetails";
import Cart from "../pages/cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/success";
import Cancel from "../pages/Cancel";
import Orderpage from "../pages/Orderpage";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>, 
       children:[
     {
      path:"",
      element:<Home/>,
    },
    {
        path:"login",
        element:<Login/>
    },
    {
        path:"forgotpassword",
        element:<Forgotpassword/>
    },
    {
     path:"search",
     element:<SearchProduct/>
    },
    {
        path:"Sign-up",
        element:<Signup/>
    },
    {
      path:"product-category",
      element:<CategoryProduct/>
    },
    {
      path:"cart",
      element:<Cart/>,
      children:[
        {
          path:"product/:id",
          element:<ProductDetails/>
        }
      ] 
    },
    {
      path:"success",
      element:<Success/>
    },
    {
      path:"all/order",
      element:<Orderpage/>
    },
    {
     path:"cencel",
     element:<Cancel/>
    },
    {
      path:"product/:id",
      element:<ProductDetails/>
    },   
    {
    path:"admin-panel",
    element:<AdminPanel/>,
    children:[
      {
        path:"all-user",
        element:<Alluser/>
      },
      {
        path:"all-product",
        element:<Allproduct/>
      }
    ]

    },
    
    ]
}
])

export default router;