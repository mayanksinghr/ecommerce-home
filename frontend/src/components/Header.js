import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { FiSearch } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import Login from "../pages/Login";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import {toast} from 'react-toastify'
import { setUserDeatails } from "../store/userslice";
import ROLE from "../common/role";
import Context from "../context";
import { useNavigate } from "react-router-dom";


const Header=()=>{
  const user = useSelector(state =>state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setmenuDisplay] = useState(false);
  const context = useContext(Context)
  const Navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setsearch] =useState(searchQuery)
  


  //console.log("searchinput",searchInput?.search.split("=")[1]);


   const handleLogout = async()=>{
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method:SummaryApi.logout_user.method,
      credentials:'include'
    })
    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message);
      dispatch(setUserDeatails(null))
      Navigate("/");
    }
    
    if(data.error){
      toast.error(data.message);
    }

   }

   const handleSerch=(e)=>{
    const {value} = e.target
    setsearch(value);
    if(value){
       Navigate(`/search/?q=${value}`);
    }else{
      Navigate("/search");
    }   
   }

    return(
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
    <div className="h-full container mx-auto flex items-center px-4 justify-between ">
     <div className="text-xl italic px-4">
     <Link to={"/"} className="rounded-full">shop here</Link>
     </div>   
     <div className="md:flex items-center  w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 hidden ">
        <input type='text' placeholder="search product here..." className="w-full outline-none pl-2" onChange={handleSerch} value={search}/>
        <div className="text-lg min-w-[50px] h-8 bg-red-600  flex items-center justify-center rounded-r-full text-white">
        <FiSearch />
        </div>
     </div>
     
     <div className="flex items-center gap-7">

      <div className="relative flex justify-center">
        {
          user?._id && (
            <div className="text-3xl cursor-pointer relative flex justify-center" onClick={()=>setmenuDisplay(preve => !preve)}>
         {
           user?.profilePic?(
              <img src={user?.profilePic} className="w-10 h-10 rounded-full" alt={user?.name}/>
            ):(
               <FaRegCircleUser/>   
           )  
         }
        </div>
         )
        }
           
       {
         menuDisplay && (
            <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
         <nav>
          {
            user?.role === ROLE.ADMIN && 
          (   <Link to= {"/admin-panel/all-product"} className="whitespace-nowrap  md:block hidden hover:bg-slate-100" onClick={()=>setmenuDisplay(preve=>!preve)}>Admin-Panel</Link>
            )
          }
          
         </nav>
      
        </div>
         )
       }
        </div>

        {
          user?._id && (
        <Link  to={"/cart"}   className="text-2xl relative">
           <span><FaShoppingCart /></span>

       
        <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
        <p className="text-sm">{context?.cartProductCount}</p>
        </div>
           
        </Link>
          )
}
         

        <div>
         {
         user?._id ?(
            <button onClick={handleLogout} className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700" >Logout</button>
         ):
         (
         <Link to={"/login"} className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">Login</Link>
         )
         }
        </div>

     </div>
     </div>
    </header>
    )
}

export default Header;