import React from "react"
import { MdModeEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import {useState} from "react";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard =({data,key,fetchdata})=>{
    const [editProduct,seteditProduct] =useState(false)

    return(  
            <div className="bg-white p-4 rounded ">
                    <div className="w-40 ">
                    <div className= " w-32 h-32 flex justify-center items-center">
                    <img src={data?.productImage[0]}   className="object-fill mx-auto h-full"/>
                    </div> ;                 
                    <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
                <div>
                <p className="font-semibold">
                {displayINRCurrency(data?.sellingprice)}
                </p>
                <div className="w-fit ml-auto p-2 bg-green-200 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"  onClick={()=>{seteditProduct(true)}} >
                <MdModeEdit />
                </div>
                </div>
                </div>
                {
                 editProduct && (
                 <AdminEditProduct productdata={data} onClose={()=>seteditProduct(false)} fetchdata= {fetchdata}/> 
                 )  
                }
               
                </div>   
    
    )
}

export default AdminProductCard;