import React, { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useState } from "react"
import { FaRegCircleUser } from "react-icons/fa6";
import "../App.css"
import { Link,Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";



  const AdminPanel =() => { 
  const user = useSelector(state =>state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setmenuDisplay] = useState(false);
  const navigate = useNavigate()


  useEffect(()=>{
  if(user?.role !== ROLE.ADMIN){
   navigate("/")
    }
 },[user])


    return(
        <div className="min-h-[calc(100vh-120px)] md:flex hidden">
            <aside className="bg-white min-h-full w-full max-w-56 customshadow">
            <div className="h-32 flex justify-center items-center flex-col">
               <div className="text-6xl cursor-pointer  flex justify-center" onClick={()=>setmenuDisplay(preve => !preve)}>
                        {
                          user?.profilePic ?(
                             <img src={user?.profilePic} className="w-16 h-16 rounded-full" alt={user?.name}/>
                           ):(
                              <FaRegCircleUser/>   
                          )  
                        }
                       </div> 
            <p className="capitalize text-lg font-semibold">{user?.name}</p>
            <p className="text-sm">{user?.role}</p>
            </div>

           <div>
               <nav className="grid p-4">
                <Link to = {"all-user"} className="px-2 py-1 hover:bg-slate-100">All user</Link>
                <Link to={"all-product"} className="px-2 py-1 hover:bg-slate-100">All product</Link>
               </nav>
           </div>


            </aside>
            <main className="w-full h-full p-4">
             <Outlet/>
            </main>
        </div>
    )
}

export default AdminPanel;