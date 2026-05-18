import React from 'react'
import loginIcons from "../assest/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa"
import { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';


const Signup=()=>{
    const [showpassword,setshowpassword] = useState(false);
    const [showconfirmpassword,setshowconfirmpassword] = useState(false);
        const [data,setdata] = useState({
        name:"",
        email:"",
        password:"",
        confirmpassword:"",
        profilePic:"",
        })

        const navigate = useNavigate();
         
    // console.log(data);
    
        const handleonchange =(e)=>{
            const {name,value} = e.target
    
           //  console.log(e.target);
    
            setdata((preve)=>{
                return{
                    ...preve,
                    [name]:value
                }
            })
        }

        const handleUploadPic= async(e)=>{
          const file = e.target.files[0]

          const imagePic = await imageTobase64(file)
          setdata((preve)=>{
            return{
                ...preve,
                profilePic:imagePic
            }
          })
        }
    
         const handleSubmit =async(e)=>{
            e.preventDefault()

         
         if(data.password===data.confirmpassword){
          const dataresponse = await fetch(SummaryApi.signup.url,{
           method:SummaryApi.signup.method,
           headers:{
            "content-type":"application/json"
           },
           body:JSON.stringify(data)
          })

          const dataapi = await dataresponse.json()
          
         if(dataapi.success){
            toast.success(dataapi.message);
            navigate("/login")
         }

        if(dataapi.error){
            toast.error(dataapi.message);
        }

        console.log("data",dataapi);

         }else{
            toast.error("please check password and confirm password")
         }
        }
    

    return(
        <section id="login">
         <div  className='mx-auto container p-4'>
        <div className='bg-white  p-2 py-4 w-full max-w-sm mx-auto'>
            <div className='h-20 w-20 mx-auto relative overflow-hidden rounded-full'>
                <div>
                <img src={data.profilePic||loginIcons} alt="login icons"/>
                </div>
                <form>
                <label>
                <div className='text-xs bg-opacity-80 bg-slate-100 pb-4 pt-2 py-3 cursor-pointer text-center absolute bottom-0 w-full '>
                 Upload photo
                </div>
                <input type="file" className='hidden' onChange={handleUploadPic}/> 
                </label>
                </form>
                
            </div>

            <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className='grid'>
                <lable>Name: </lable>
                <div className='bg-slate-100 p-2'>
                <input type="text" placeholder="enter your name"  onChange={handleonchange} value={data.name} required name="name" className='w-full h-full outline-none bg-transparent'/>
                </div>
                </div>
            

                <div className='grid'>
                <lable>Email: </lable>
                <div className='bg-slate-100 p-2'>
                <input type="email" placeholder="enter email"  onChange={handleonchange} value={data.email}  required name="email" className='w-full h-full outline-none bg-transparent'/>
                </div>
                </div>
                <div>
                <lable>password: </lable>
                <div className='bg-slate-100 p-2 flex'>
                <input type={showpassword?"text":"password"} placeholder="enter password" name="password" required onChange={handleonchange} value={data.password} className='w-full h-full outline-none bg-transparent' />
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
                </div>
                <div>
                <lable>confirm password:</lable>
                <div className='bg-slate-100 p-2 flex'>
                <input type={showconfirmpassword?"text":"password"} placeholder="enter confirm password" required name="confirmpassword" onChange={handleonchange} value={data.confirmpassword} className='w-full h-full outline-none bg-transparent' />
                <div className='cursor-pointer text-xl' onClick={()=>setshowconfirmpassword((preve)=>!preve)}>
                    <span>
                    {
                    showconfirmpassword?(
                        <FaEyeSlash />
                    ):(
                    <FaEye/> 
                    )
                }   
                    </span>
                </div>
                </div>
                
                </div>



                <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-4'>sign up</button>
            </form>
             
             <p className='my-5'>all ready have account?<Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>

        </div>  
        </div>   
        </section>
    )
}

export default Signup;