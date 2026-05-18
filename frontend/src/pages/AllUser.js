import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import SummaryApi from "../common"
import '../App.css';
import { toast } from "react-toastify"
import moment from "moment/moment"
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole"

 const Alluser = ()=>{
    const[allUsers,setallUsers] = useState([])
    const [openupdaterole,setopenupdaterole] = useState(false)
    const [updateuserdeatails,setupdateuserdeatails] = useState({
        email:"",
        name:"",
        role:"",
        _id:"",
    })


    
    const fetchAllUsers = async()=>{
        const fetchData = await fetch(SummaryApi.alluser.url,{
            method:SummaryApi.alluser.method,
            credentials:'include'
        })
      
        const dataResponse = await fetchData.json()

        if(dataResponse.success){
            setallUsers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

        console.log("alluser",dataResponse)
    }

    
    


    useEffect(()=>{
        fetchAllUsers();
    },[])

    
    return(
        <div>
            <table className = "w-full userTable">
                <thead>
                    <tr className="bg-black text-white">
                    <th>sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Create Date</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    allUsers.map((el,index)=>{
                        return(
                            <tr>
                                 <td>{index+1}</td>
                                 <td>{el?.name}</td>
                                 <td>{el?.email}</td>
                                 <td>{el?.role}</td>
                                 <td>{moment(el?.createdAt).format('LL')}</td>
                                 <td><button className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-300 hover:text-white" onClick={()=>
                                    {
                                        setupdateuserdeatails(el) 
                                        setopenupdaterole(true)
                                 }}>
                                 <MdModeEdit /></button></td>
                            </tr>
                        )  
                    })
                    }
                </tbody>
            </table>
           {
            openupdaterole && (
            <ChangeUserRole onClose = {()=>setopenupdaterole(false)}
            name={updateuserdeatails.name}
            email={updateuserdeatails.email}
            role={updateuserdeatails.role}
            userId={updateuserdeatails._id}
            callFunc={fetchAllUsers}/>
            )
           }
        </div>
    )

}

export default Alluser