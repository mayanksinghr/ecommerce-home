import React, { useContext } from 'react'
import loginIcons from "../assest/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash} from "react-icons/fa";
import { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import context from '../context';
import { useDispatch, useSelector } from "react-redux";
import { setUserDeatails } from "../store/userslice";

const Login=()=>{
    const user = useSelector(state =>state?.user?.user)
    const dispatch = useDispatch()

    

   // const fetchUserDeatails = async()=>{
       // const dataResponse = await fetch(SummaryApi.current_user.url,{
      //  method:SummaryApi.current_user.method,
     //   credentials:"include"
     //   })
     //   const dataApi =await dataResponse.json()
    
      //  if(dataApi.success){
      //   dispatch(setUserDeatails(dataApi.data))
    //  }
     //   console.log("data-user",dataApi)
     // }
    

    const [showpassword,setshowpassword] = useState(false);
    const [data,setdata] = useState({
    email:"",
    password:"",
    })

    const navigate = useNavigate()
    const {fetchUserDeatails,fetchUserAddTocart} = useContext(context)
 
    const handleonchange =(e)=>{
        const {name,value} = e.target

        // console.log(e.target);

        setdata((preve)=>{
            return{
                ...preve,
                [name]:value
            }
        })
    

    const handleSubmit =async(e)=>{
        e.preventDefault()

      const dataResponse = await fetch(SummaryApi.signin.url,{
        method:SummaryApi.signin.method,
        credentials:'include',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
      })

      const dataApi = await dataResponse.json();}
     

      if(dataApi.success){
      toast.success(dataApi.message);
      navigate('/')
      fetchUserDeatails()
      fetchUserAddTocart()
      }
    
      if(dataApi.error){
        toast.error(dataApi.message);
      }

     }

      
     
    return(
        <section id="login">
         <div  className='mx-auto container p-4'>
        <div className='bg-white  p-2 py-4 w-full max-w-sm mx-auto'>
            <div className='h-20 w-20 mx-auto'>
                <img src = {loginIcons} alt="login icons"/>
            </div>
            <form className="pt-6  flex flex-col gap-2" onSubmit={handleSubmit}>
                <div className='grid'>
                <lable>Email: </lable>
                <div className='bg-slate-100 p-2'>
                <input type="email" placeholder="enter email"  onChange={handleonchange} value={data.email} name="email" className='w-full h-full outline-none bg-transparent'/>
                </div>
                </div>
                <div>
                <lable>password: </lable>
                <div className='bg-slate-100 p-2 flex'>
                <input type={showpassword?"text":"password"} placeholder="enter password" name="password" onChange={handleonchange} value={data.password} className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={()=>setshowpassword((preve)=>!preve)}>
                    <span>
                    {
                    showpassword?(
                        <FaEyeSlash />
                    ):(
                    <FaEye/> 
                    )
                }   
                    </span>
                </div>
                </div>
                <Link to= {'/forgotpassword'} className='block w-fit ml-auto hover:underline hover:text-red-500'>forgot password</Link>
                </div>
                <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>Login</button>
            </form>
             
             <p className='my-5'>Don't have account?<Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>

        </div>  
        </div>   
        </section>
    )
}

export default Login